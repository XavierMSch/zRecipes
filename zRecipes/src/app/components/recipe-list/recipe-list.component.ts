import { Component, OnInit, Input } from '@angular/core';
import { RecipeDisplay } from 'src/app/interfaces/recipe.interface';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  standalone: false,
})
export class RecipeListComponent{

  @Input() recipes: RecipeDisplay[] = [];

  constructor() { }

  trackByRecipeId(index: number, recipe: RecipeDisplay): number {
    return recipe.id;
  }

}
