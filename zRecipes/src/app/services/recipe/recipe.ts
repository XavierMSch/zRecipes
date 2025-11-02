import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../../interfaces/recipe.interface';
import { AuthService } from '../auth/auth';

const API_URL = 'apiurl/recipes'

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  
  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  getRecipe(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${API_URL}/${id}`);
  }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${API_URL}`); 
  }

  createRecipe(newRecipe: Omit<Recipe, 'id'>): Observable<Recipe> {
    return this.http.post<Recipe>(`${API_URL}`, newRecipe);
  }

  updateRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(`${API_URL}/${recipe.id}`, recipe); 
  }

  deleteRecipe(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
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

  searchRecipesByName(terminoBusqueda: string | null): Observable<Recipe[]> {
    let params = new HttpParams();
    if (terminoBusqueda) {
      params = params.set('q', terminoBusqueda);
    }
    return this.http.get<Recipe[]>(`${API_URL}`, {params: params});
  }
}

