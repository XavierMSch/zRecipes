import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { RecipeListComponent } from '../recipe-list/recipe-list.component';
import { ReportCardComponent } from '../report-card/report-card.component';
import { ReportListComponent } from '../report-list/report-list.component';
import { ReportDetailComponent } from '../report-detail/report-detail.component';
import { FavoriteCategoryCardComponent } from '../favorite-category-card/favorite-category-card.component';
import { FavoriteCategoryListComponent } from '../favorite-category-list/favorite-category-list.component';
import { RecipeFormComponent } from '../recipe-form/recipe-form.component';
import { CategorySelector } from '../category-selector/category-selector.component';
import { CreateCategoryModal } from '../create-category-modal/create-category-modal.component';

@NgModule({
  declarations: [
    RecipeCardComponent, 
    RecipeListComponent, 
    FavoriteCategoryCardComponent, 
    FavoriteCategoryListComponent,
    RecipeFormComponent,
    CategorySelector,
    CreateCategoryModal,
    ReportCardComponent,
    ReportListComponent,
    ReportDetailComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule 
  ],
  exports: [
    RecipeCardComponent, 
    RecipeListComponent,
    FavoriteCategoryCardComponent, 
    FavoriteCategoryListComponent,
    RecipeFormComponent,
    CategorySelector,
    CreateCategoryModal,
    ReportCardComponent,
    ReportListComponent,
    ReportDetailComponent
  ]
})
export class ComponentsModule { }
