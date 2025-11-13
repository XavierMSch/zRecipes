import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth';


@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.scss'],
  standalone: false
})
export class ChangePasswordModalComponent  implements OnInit {

  currentPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';

  constructor(private authService: AuthService, private toastController: ToastController, private modalCtrl: ModalController) { }

  ngOnInit() {}

  onSubmit() {
    this.authService.changePassword(this.currentPassword, this.newPassword).subscribe({
      next: () => {
        this.toastController.create({
          message: 'Contraseña cambiada exitosamente',
          duration: 2000,
          color: 'success'
        }).then(toast => toast.present());
        this.modalCtrl.dismiss();
      },
      error: (error) => {
        this.toastController.create({
          message: 'Error al cambiar la contraseña: ' + error.error.message,
          duration: 2000,
          color: 'danger'
        }).then(toast => toast.present());
      }
    });
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
