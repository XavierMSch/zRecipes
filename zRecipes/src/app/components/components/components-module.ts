import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';


import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { RecipeListComponent } from '../recipe-list/recipe-list.component';
import { FavoriteCategoryCardComponent } from '../favorite-category-card/favorite-category-card.component';
import { FavoriteCardListComponent } from '../favorite-card-list/favorite-card-list.component';



@NgModule({
  declarations: [
    RecipeCardComponent, 
    RecipeListComponent, 
    FavoriteCategoryCardComponent, 
    FavoriteCardListComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    RecipeCardComponent, 
    RecipeListComponent,
    FavoriteCategoryCardComponent, 
    FavoriteCardListComponent
  ]
})
export class ComponentsModule { }
