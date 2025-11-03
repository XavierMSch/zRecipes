import { Component, OnInit } from '@angular/core';
import { RecipeListService } from 'src/app/services/recipe-list/recipe-list';
import { RecipeService } from 'src/app/services/recipe/recipe';
import { RecipeInList } from 'src/app/interfaces/recipe-in-list';
import { Category } from 'src/app/interfaces/category.interface';
import { Recipe } from 'src/app/interfaces/recipe.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.page.html',
  styleUrls: ['./favorites-list.page.scss'],
  standalone: false
})
export class FavoritesListPage implements OnInit {

  currentListId: number = 0;
  currentListName: string = '';
  recipes: RecipeInList[] = [];

  constructor(
    private recipeService: RecipeService,
    private recipeListService: RecipeListService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.currentListId = +this.route.snapshot.paramMap.get('categoryId')!;
    this.loadFavoriteRecipes(this.currentListId);
  }

  private loadFavoriteRecipes(listId: number) {
    this.recipeListService.getRecipeList(listId).subscribe({
      next: (data) => {
        console.log('Datos de la lista de favoritos recibidos:', data);
        this.currentListName = data.name;
        this.recipes = data.recipes;
      },
      error: (err) => {
        console.error(`Error al cargar la lista de favoritos. ListID: ${listId}`, err);
      }
    });
  }
}
