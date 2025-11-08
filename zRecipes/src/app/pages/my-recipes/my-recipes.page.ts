import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';

import { RecipeService } from 'src/app/services/recipe/recipe';
import { Recipe } from 'src/app/interfaces/recipe.interface';  

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.page.html',
  styleUrls: ['./my-recipes.page.scss'],
  standalone: false,
})
export class MyRecipesPage implements OnInit {
  createdRecipes: Recipe[] = [];
  
  constructor(
    private recipeService: RecipeService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.loadCreatedRecipes();
  }

  async loadCreatedRecipes() {
    this.recipeService.getCreatedRecipes().subscribe((recipes: Recipe[]) => {
      this.createdRecipes = recipes;
      console.log('Recetas creadas:', this.createdRecipes);
    });
  }
  
  trackByRecipeId(index: number, recipe: Recipe): number {
    return recipe.id;
  }

  async handleDeleteRecipe(recipeId: number) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar esta receta?',
      buttons: [  
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.deleteRecipe(recipeId);
          }
        }
      ]
    });
    await alert.present();
  }

  private deleteRecipe(recipeId: number) {
    this.recipeService.deleteRecipe(recipeId).subscribe({
      next: async () => {
        const toast = await this.toastCtrl.create({
          message: 'Receta eliminada correctamente.',
          duration: 2000,
          color: 'success'
        });
        toast.present();
        this.loadCreatedRecipes();
      },
      error: async (error) => {
        const toast = await this.toastCtrl.create({
          message: 'Error al eliminar la receta. Inténtalo de nuevo.',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }
    });
  }
}
