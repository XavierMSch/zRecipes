import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipeInfoPageRoutingModule } from './recipe-info-routing.module';

import { RecipeInfoPage } from './recipe-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipeInfoPageRoutingModule
  ],
  declarations: [RecipeInfoPage]
})
export class RecipeInfoPageModule {}
