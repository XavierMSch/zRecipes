import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyRecipesPageRoutingModule } from './my-recipes-routing.module';

import { MyRecipesPage } from './my-recipes.page';

import { ComponentsModule } from 'src/app/components/components/components-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyRecipesPageRoutingModule, 
    ComponentsModule
  ],
  declarations: [MyRecipesPage]
})
export class MyRecipesPageModule { }
