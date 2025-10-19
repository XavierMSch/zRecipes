import { Component, OnInit, Input } from '@angular/core';

import { Category } from 'src/app/interfaces/category.interface';

@Component({
  selector: 'app-favorite-card-list',
  templateUrl: './favorite-card-list.component.html',
  styleUrls: ['./favorite-card-list.component.scss'],
  standalone: false
})
export class FavoriteCardListComponent  {
  @Input() favoriteCategories: Category[] = [];

  constructor() { }

  trackByCategoryId(_index: number, category: Category): number {
    return category.id;
  }
  

}
