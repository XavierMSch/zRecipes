import { Component, OnInit, Input } from '@angular/core';

import { Category } from 'src/app/interfaces/category.interface';

@Component({
  selector: 'app-favorite-category-card',
  templateUrl: './favorite-category-card.component.html',
  styleUrls: ['./favorite-category-card.component.scss'],
  standalone: false
})
export class FavoriteCategoryCardComponent implements OnInit {
  @Input() category!: Category;

  constructor() { }

  ngOnInit() {
  }

}
