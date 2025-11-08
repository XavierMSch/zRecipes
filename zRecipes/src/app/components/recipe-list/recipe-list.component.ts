import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { RecipeDisplay } from '../../interfaces/recipe.interface';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  standalone: false,
})
export class RecipeListComponent implements OnInit {
  @Input() recipes: RecipeDisplay[] = [];
  @Input() showDeleteButton: boolean = false;
  @Output() onDeleteRecipe = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {}

  trackByRecipeId(index: number, recipe: RecipeDisplay): number {
    return recipe.id;
  }

  handleDelete(recipeId: number) {
    this.onDeleteRecipe.emit(recipeId);
  }
}