import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';


import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { RecipeListComponent } from '../recipe-list/recipe-list.component';
import { FavoriteCategoryCardComponent } from '../favorite-category-card/favorite-category-card.component';
import { FavoriteCategoryListComponent } from '../favorite-category-list/favorite-category-list.component';



@NgModule({
  declarations: [
    RecipeCardComponent, 
    RecipeListComponent, 
    FavoriteCategoryCardComponent, 
    FavoriteCategoryListComponent
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
    FavoriteCategoryListComponent
  ]
})
export class ComponentsModule { }
