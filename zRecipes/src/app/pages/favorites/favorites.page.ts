import { Component, OnInit } from '@angular/core';
import { RecipeListService } from 'src/app/services/recipe-list/recipe-list';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: false,
})


export class FavoritesPage{
  favoriteCategories: any[] = [];

  constructor(private recipeListService: RecipeListService) { }

  ngOnInit() {
    this.recipeListService.getRecipeLists().subscribe((categories: any[]) => {
      this.favoriteCategories = categories;
    });
  }

  trackByCategoryId(_index: number, category: any): number {
    return category.id;
  }

}
