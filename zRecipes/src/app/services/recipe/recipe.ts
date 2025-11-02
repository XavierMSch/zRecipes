import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../../interfaces/recipe.interface';
import { AuthService } from '../auth/auth';

const API_URL = 'http://localhost:8000/recipes/'

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  
  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.auth.getCurrentAuthToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  private adaptRecipeForBackend(recipe: Omit<Recipe, 'id'>): any {
    return {
      name: recipe.name,
      description: recipe.description || null,
      image_url: recipe.image_url || null,
      ingredients: recipe.ingredients.map(ing => ({
        quantity: ing.quantity,
        ingredient_name: ing.ingredient_name
      })),
      steps: recipe.steps.map((step, index) => ({
        step_number: index + 1,
        step_description: step.step_description,
        image_url: step.image_url || null
      }))
    };
  }

  getRecipe(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${API_URL}${id}`);
  }

  getRecipes(skip: number = 0, limit: number = 20, searchQuery?: string): Observable<Recipe[]> {
    let params = new HttpParams()
      .set('skip', skip.toString())
      .set('limit', limit.toString());
    
    if (searchQuery && searchQuery.trim() !== '') {
      params = params.set('q', searchQuery.trim());
    }
    
    return this.http.get<Recipe[]>(`${API_URL}`, { params });
  }

  createRecipe(newRecipe: Omit<Recipe, 'id'>): Observable<Recipe> {
    const headers = this.getAuthHeaders();
    const adaptedRecipe = this.adaptRecipeForBackend(newRecipe);
    console.log('Datos enviados al backend:', JSON.stringify(adaptedRecipe, null, 2));
    console.log('Receta original:', JSON.stringify(newRecipe, null, 2));
    return this.http.post<Recipe>(`${API_URL}`, adaptedRecipe, { headers });
  }

  updateRecipe(recipe: Recipe): Observable<Recipe> {
    const headers = this.getAuthHeaders();
    return this.http.put<Recipe>(`${API_URL}/${recipe.id}`, recipe, { headers });
  }

  deleteRecipe(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${API_URL}/${id}`, { headers });
  }

  getCreatedRecipes(): Observable<Recipe[]> {
    const token = this.auth.getCurrentAuthToken();
    const userId = this.auth.getCurrentUserId();

    if (!token || !userId) {
      console.warn('Usuario no autenticado. No se pueden cargar las recetas.');
      return new Observable<Recipe[]>(); 
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });

    const params = new HttpParams().set('owner_id', userId.toString());

    return this.http.get<Recipe[]>(`${API_URL}`, {headers: headers, params: params});
  }
}



