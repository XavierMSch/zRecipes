import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { UserService, UserRegister } from '../../services/user/user.service';
import { AuthService } from '../../services/auth/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  email: string = '';
  username: string = '';
  rut: string = '';
  region: string = '';
  comuna: string = '';
  password: string = '';
  confirmPassword: string = '';
  acceptTerms: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['/home']);
      }
    });
  }

  async onSubmit() {
    const validation = this.validateForm();
    if (!validation.valid) {
      await this.showAlert('Error de validación', validation.message);
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Creando cuenta...',
    });
    await loading.present();

    const userData: UserRegister = {
      email: this.email.trim().toLowerCase(),
      username: this.username.trim(),
      rut: this.rut.trim(),
      region: this.region,
      comuna: this.comuna.trim(),
      password: this.password
    };

    this.userService.registerUser(userData).subscribe({
      next: async (response) => {
        await loading.dismiss();
        
        await this.showAlert(
          'Registro exitoso',
          'Tu cuenta ha sido creada. Ahora puedes iniciar sesión.'
        );

        this.router.navigate(['/login']);
      },
      error: async (error) => {
        await loading.dismiss();
        console.error('Error en registro:', error);
        console.log('Error status:', error.status);

        let errorMessage = 'Error al crear la cuenta';

        if (error.status === 400) {
          errorMessage = error.error.detail || 'Datos inválidos o ya registrados';
        } else if (error.status === 0) {
          errorMessage = 'No se pudo conectar con el servidor';
        }
        
        await this.showAlert('Error', errorMessage);
      }
    });
  }

  private validateForm(): { valid: boolean; message: string } {
    if (!this.email || !this.username || !this.rut || !this.region || 
        !this.comuna || !this.password || !this.confirmPassword) {
      return { valid: false, message: 'Por favor completa todos los campos' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      return { valid: false, message: 'Por favor ingresa un email válido' };
    }

    const rutRegex = /^\d{7,8}-[\dkK]$/;
    if (!rutRegex.test(this.rut)) {
      return { valid: false, message: 'RUT inválido. Formato: 12345678-9' };
    }

    if (this.password.length < 6) {
      return { valid: false, message: 'La contraseña debe tener al menos 6 caracteres' };
    }

    if (this.password !== this.confirmPassword) {
      return { valid: false, message: 'Las contraseñas no coinciden' };
    }

    if (!this.acceptTerms) {
      return { valid: false, message: 'Debes aceptar los términos y condiciones' };
    }

    return { valid: true, message: '' };
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
