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

  ngOnInit() 
  { this.revisionImagen(); }


  
  revisionImagen(): void {
    if (this.category.image && this.category.image.trim() !== '') {
      return ;
    } else if (this.category.recipes.length === 0) {
      this.category.image = 'assets/icon/logo.png';
    }
    else if (this.category.recipes.length > 0) {
      this.category.image = this.category.recipes[0].image_url;
    }
  }
}
