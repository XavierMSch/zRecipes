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

    // Adaptar el formato para que coincida con la interfaz Recipe
    const recipe = {
      name: this.recipeName,
      img_url: this.recipeImage, // Cambiar 'image' por 'img_url'
      description: this.recipeDescription,
      ingredients: this.ingredients
        .filter(ing => ing.name.trim() !== '')
        .map(ing => ({
          name: ing.name,  // El servicio adaptará esto a 'ingredient_name'
          quantity: ing.quantity
        })),
      steps: this.steps
        .filter(step => step.description.trim() !== '')
        .map(step => ({
          stepDesc: step.description, // El servicio adaptará esto
          stepImg: step.image
        })),
      author: '', // Se establecerá desde el backend
      numLikes: 0,
      numSaved: 0
    };
    
    this.recipeSubmitted.emit(recipe);
  }
}