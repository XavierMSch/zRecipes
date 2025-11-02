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
  ingredients: Array<{id: number, name: string, quantity: string}> = [{id: 1, name: '', quantity: ''}];
  steps: Array<{id: number, description: string, image: string}> = [{id: 1, description: '', image: ''}];

  addIngredient() {
    const newId = this.ingredients.length + 1;
    this.ingredients.push({id: newId, name: '', quantity: ''  });
  }

  removeIngredient() {
    if (this.ingredients.length > 1) {
      this.ingredients.pop();
    }
  }

  addStep() {
    const newId = this.steps.length + 1;
    this.steps.push({id: newId, description: '', image: ''});
  }

  removeStep() {
    if (this.steps.length > 1) {
      this.steps.pop();
    }
  }

  submitRecipe() {
    if (!this.recipeName.trim() || !this.recipeDescription.trim()) {
      alert('Nombre y descripción son obligatorios.');
      return;
    }
    const recipe = {
      name: this.recipeName,
      image_url: this.recipeImage, 
      description: this.recipeDescription,
      ingredients: this.ingredients
        .filter(ing => ing.name.trim() !== '')
        .map(ing => ({
          ingredient_name: ing.name,  
          quantity: ing.quantity
        })),
      steps: this.steps
        .filter(step => step.description.trim() !== '')
        .map(step => ({
          step_description: step.description, 
          image_url: step.image
        })),
      author: '', 
      numLikes: 0,
      numSaved: 0
    };
    
    this.recipeSubmitted.emit(recipe);
  }
}
