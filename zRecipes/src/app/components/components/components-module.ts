import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { RecipeListComponent } from '../recipe-list/recipe-list.component';
import { FavoriteCategoryCardComponent } from '../favorite-category-card/favorite-category-card.component';
import { FavoriteCategoryListComponent } from '../favorite-category-list/favorite-category-list.component';
import { RecipeFormComponent } from '../recipe-form/recipe-form.component';


@NgModule({
  declarations: [
    RecipeCardComponent, 
    RecipeListComponent, 
    FavoriteCategoryCardComponent, 
    FavoriteCategoryListComponent,
    RecipeFormComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule // Agregar FormsModule aquí
  ],
  exports: [
    RecipeCardComponent, 
    RecipeListComponent,
    FavoriteCategoryCardComponent, 
    FavoriteCategoryListComponent,
    RecipeFormComponent
  ]
})
export class ComponentsModule { }
