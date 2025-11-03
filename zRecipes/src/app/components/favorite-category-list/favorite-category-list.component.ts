import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category.interface';

@Component({
  selector: 'app-favorite-category-list',
  templateUrl: './favorite-category-list.component.html',
  styleUrls: ['./favorite-category-list.component.scss'],
  standalone: false
})
export class FavoriteCategoryListComponent  {
  @Input() favoriteCategories: Category[] = [];

  constructor(
    private router: Router
  ) { }

  trackByCategoryId(_index: number, category: Category): number {
    return category.id;
  }
  
  onCategoryClick(category: Category): void {
    this.router.navigate([`/favorites-list/${category.id}`], { queryParams: { categoryId: category.id } });
  }
}
