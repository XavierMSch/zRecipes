import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Recipe } from '../../interfaces/recipe.interface'

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
  standalone: false,
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe!: Recipe;

  constructor() { }

  ngOnInit() { }

}
