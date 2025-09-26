import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeInfoPage } from './recipe-info.page';

const routes: Routes = [
  {
    path: '',
    component: RecipeInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeInfoPageRoutingModule {}
