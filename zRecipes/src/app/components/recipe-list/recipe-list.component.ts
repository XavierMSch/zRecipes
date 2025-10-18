import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../interfaces/recipe.interface';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  standalone: false,
})
export class RecipeListComponent{

  @Input() recipes: Recipe[] = [];

  constructor() { }

  trackByRecipeId(index: number, recipe: Recipe): number {
    return recipe.id;
  }

}
