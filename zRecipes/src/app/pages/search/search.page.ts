import { Component, OnInit } from '@angular/core';

import { Recipe } from '../../interfaces/recipe.interface'
import { RecipeService } from 'src/app/services/recipe';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: false,
})
export class SearchPage implements OnInit {
  recipes: Recipe[] = []

  constructor(private recipeService: RecipeService) { }

  handleSearch(event: any) {
    const searchTerm = event.detail.value;
    if (searchTerm === '') {
      this.recipes = this.recipeService.getRecipes();
    }
    this.recipes = this.recipeService.searchRecipesByName(searchTerm);
  }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }

}
