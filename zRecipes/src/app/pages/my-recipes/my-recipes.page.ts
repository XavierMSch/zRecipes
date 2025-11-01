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
    this.createdRecipes = this.recipeService.getCreatedRecipes();
  }
  
  trackByRecipeId(index: number, recipe: Recipe): number {
    return recipe.id;
  }


}
