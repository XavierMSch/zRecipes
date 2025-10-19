import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Recipe } from 'src/app/interfaces/recipe.interface';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
  standalone: false,
})
export class RecipeFormComponent {
  @Output() recipeSubmitted = new EventEmitter<any>();

  recipeImage: string = '';
  recipeName: string = '';
  recipeDescription: string = '';
  ingredients: Array<{id: number, name: string}> = [{id: 1, name: ''}];
  steps: Array<{id: number, description: string, image: string}> = [{id: 1, description: '', image: ''}];

  addIngredient() {
    const newId = this.ingredients.length + 1;
    this.ingredients.push({id: newId, name: ''});
  }

  addStep() {
    const newId = this.steps.length + 1;
    this.steps.push({id: newId, description: '', image: ''});
  }

  submitRecipe() {
    if (!this.recipeName.trim() || !this.recipeDescription.trim()) {
      alert('Nombre y descripción son obligatorios.');
      return;
    }

    const recipe = {
      name: this.recipeName,
      image: this.recipeImage,
      description: this.recipeDescription,
      ingredients: this.ingredients.filter(ing => ing.name.trim() !== ''),
      steps: this.steps.filter(step => step.description.trim() !== '')
    };
    
    this.recipeSubmitted.emit(recipe);
  }
}