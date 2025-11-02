import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateRecipePageRoutingModule } from './create-recipe-routing.module';

import { CreateRecipePage } from './create-recipe.page';

import { ComponentsModule } from 'src/app/components/components/components-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    IonicModule,
    CreateRecipePageRoutingModule
  ],
  declarations: [CreateRecipePage]
})
export class CreateRecipePageModule {}

