import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }

  ngOnInit(): void {
    // Verificar si ya está logueado
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['/home']);
      }
    });
  }

  async onSubmit() {
    // Validaciones básicas
    if (!this.email || !this.password) {
      await this.showAlert('Error', 'Por favor completa todos los campos');
      return;
    }

    // Mostrar loading
    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
    });
    await loading.present();

    // Intentar login
    this.authService.loginWithCredentials(this.email, this.password).subscribe({
      next: async (success) => {
        await loading.dismiss();
        if (success) {
          this.router.navigate(['/home']);
        }
      },
      error: async (error) => {
        await loading.dismiss();
        console.error('Error en login:', error);
        
        let errorMessage = 'Error al iniciar sesión';
        if (error.status === 401) {
          errorMessage = 'Email o contraseña incorrectos';
        } else if (error.status === 0) {
          errorMessage = 'No se pudo conectar con el servidor';
        }
        
        await this.showAlert('Error', errorMessage);
      }
    });
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
