import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Recipe, RecipeDisplay } from '../../interfaces/recipe.interface'

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
  standalone: false,
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe!: RecipeDisplay;
  @Input() showDeleteButton: boolean = false;
  @Output() deleteRecipe = new EventEmitter<number>();

  constructor() { }

  ngOnInit() { }

  onDelete(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.deleteRecipe.emit(this.recipe.id);
  }
}