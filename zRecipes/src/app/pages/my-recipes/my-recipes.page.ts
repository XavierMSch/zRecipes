import { Component, OnInit } from '@angular/core';

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
  
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.getCreatedRecipes().subscribe((recipes: Recipe[]) => {
      this.createdRecipes = recipes;
      console.log('Recetas creadas:', this.createdRecipes);
    });
  }
  
  trackByRecipeId(index: number, recipe: Recipe): number {
    return recipe.id;
  }
  

  

}
