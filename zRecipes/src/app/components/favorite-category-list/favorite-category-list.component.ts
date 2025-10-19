import { Component, OnInit, Input } from '@angular/core';

import { Category } from 'src/app/interfaces/category.interface';

@Component({
  selector: 'app-favorite-category-list',
  templateUrl: './favorite-category-list.component.html',
  styleUrls: ['./favorite-category-list.component.scss'],
  standalone: false
})
export class FavoriteCategoryListComponent  {
  @Input() favoriteCategories: Category[] = [];

  constructor() { }

  trackByCategoryId(_index: number, category: Category): number {
    return category.id;
  }
  

}
