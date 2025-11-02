import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RecipeListService } from 'src/app/services/recipe-list/recipe-list';
import { CreateCategoryModal } from 'src/app/components/create-category-modal/create-category-modal.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: false,
})
export class FavoritesPage implements OnInit {
  favoriteCategories: any[] = [];

  constructor(
    private recipeListService: RecipeListService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.recipeListService.getRecipeLists().subscribe((categories: any[]) => {
      this.favoriteCategories = categories;
    });
  }

  async openCreateCategoryModal() {
    const modal = await this.modalCtrl.create({
      component: CreateCategoryModal
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data && data.created) {
      this.loadCategories(); // Recargar las categorías
    }
  }

  trackByCategoryId(_index: number, category: any): number {
    return category.id;
  }
}
