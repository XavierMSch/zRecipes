import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';


import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { RecipeListComponent } from '../recipe-list/recipe-list.component';



@NgModule({
  declarations: [RecipeCardComponent, RecipeListComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [RecipeCardComponent, RecipeListComponent]
})
export class ComponentsModule { }
