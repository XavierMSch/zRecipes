import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe/recipe';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.page.html',
  styleUrls: ['./create-recipe.page.scss'],
  standalone: false,
})
export class CreateRecipePage {

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private toastCtrl: ToastController
  ) { }

  async onRecipeSubmitted(recipe: any) {
    console.log('Receta recibida en CreateRecipePage:', recipe);
    
    this.recipeService.createRecipe(recipe).subscribe({
      next: async (data) => {
        console.log('Receta creada con éxito:', data);
        const toast = await this.toastCtrl.create({
          message: 'Receta creada exitosamente',
          duration: 2000,
          color: 'success'
        });
        await toast.present();
        
        this.router.navigate(['/my-recipes']);
      },
      error: async (err) => {
        console.error('Error al crear la receta:', err);
        const toast = await this.toastCtrl.create({
          message: 'Error al crear la receta. Inténtalo de nuevo.',
          duration: 2000,
          color: 'danger'
        });
        await toast.present();
      }
    });
  }
}