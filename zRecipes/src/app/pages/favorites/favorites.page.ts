import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe/recipe';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: false,
})


export class FavoritesPage{
  favoriteCategories: any[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    /* this.favoriteCategories = this.recipeService.getFavoriteCategories(); */ 
  }

  trackByCategoryId(_index: number, category: any): number {
    return category.id;
  }

}
