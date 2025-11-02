import { Component } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { RecipeListService } from 'src/app/services/recipe-list/recipe-list';

@Component({
  selector: 'app-create-category-modal',
  templateUrl: './create-category-modal.component.html',
  styleUrls: ['./create-category-modal.component.scss'],
  standalone: false
})
export class CreateCategoryModal {
  categoryName: string = '';

  constructor(
    private modalCtrl: ModalController,
    private recipeListService: RecipeListService,
    private toastCtrl: ToastController
  ) {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

  async createCategory() {
    if (!this.categoryName.trim()) {
      await this.showToast('Por favor ingresa un nombre para la categoría');
      return;
    }

    const newCategory = {
      name: this.categoryName.trim()
    };

    this.recipeListService.createRecipeList(newCategory).subscribe({
      next: async (category) => {
        await this.showToast('Categoría creada exitosamente');
        this.modalCtrl.dismiss({ created: true, category });
      },
      error: async (error) => {
        console.error('Error al crear categoría:', error);
        console.error('Detalles del error:', error.error);
        
        let errorMessage = 'Error al crear la categoría';
        
        if (error.status === 422) {
          errorMessage = 'El nombre de la categoría no es válido';
        } else if (error.status === 0) {
          errorMessage = 'No se pudo conectar con el servidor';
        }
        
        await this.showToast(errorMessage);
      }
    });
  }

  private async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }
}