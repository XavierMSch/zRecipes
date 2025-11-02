import { Component, OnInit } from '@angular/core';

import { Recipe } from '../../interfaces/recipe.interface'
import { RecipeService } from 'src/app/services/recipe/recipe';

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
      this.recipeService.getRecipes().subscribe({
        next: (recipes) => {
          this.recipes = recipes;
        },
        error: (err) => {
          console.error('Error al cargar las listas:', err);
        }
      });
    } else {
        this.recipeService.getRecipes(0,20,searchTerm).subscribe({
        next: (results) => {
          this.recipes = results;
        },
        error: (err) => {
          console.error('Error de búsqueda.', err);
        }
      });
    }
  }

  ngOnInit() {
    this.recipeService.getRecipes().subscribe({
        next: (recipes) => {
          this.recipes = recipes;
        },
        error: (err) => {
          console.error('Error al cargar las listas:', err);
        }
      });
  }

}
