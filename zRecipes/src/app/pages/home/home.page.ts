import { Component, OnInit } from '@angular/core';

import { Recipe } from '../../interfaces/recipe.interface'
import { RecipeService } from 'src/app/services/recipe/recipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  recipes: Recipe[] = []

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.getRecipes().subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
  }
  trackByRecipeId(index: number, recipe: Recipe): number {
    return recipe.id;
  }

}
