import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe/recipe';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.page.html',
  styleUrls: ['./create-recipe.page.scss'],
  standalone: false,
})
export class CreateRecipePage {

  constructor(
    private recipeService: RecipeService,
    private router: Router
  ) { }

  onRecipeSubmitted(recipe: any) {
    /* this.recipeService.addRecipe(recipe);  */
    console.log('Receta creada:', recipe);
    this.router.navigate(['/my-recipes']);
  }
}