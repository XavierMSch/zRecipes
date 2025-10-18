import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { RecipeListComponent } from '../recipe-list/recipe-list.component';



@NgModule({
  declarations: [RecipeCardComponent, RecipeListComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
