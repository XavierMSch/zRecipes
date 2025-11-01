import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { RecipeListService } from 'src/app/services/recipe-list/recipe-list';
import { Category } from 'src/app/interfaces/category.interface';

@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.scss'],
  standalone: false
})
export class CategorySelector  implements OnInit {

  recipeLists$: Observable<Category[]> = this.recipeListService.getRecipeLists();
  
  constructor(
    private modalCtrl: ModalController, 
    private recipeListService: RecipeListService
  ) {}

  ngOnInit() {
    this.recipeLists$ = this.recipeListService.getRecipeLists();
  }

  selectedCategory(categoryId: number) {
    this.modalCtrl.dismiss({ selectedCategoryId: categoryId });
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
