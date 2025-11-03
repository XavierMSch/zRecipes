import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../interfaces/category.interface';
import { AuthService } from '../auth/auth';

const API_URL = 'http://localhost:8000/recipe-lists/'

@Injectable({
  providedIn: 'root'
})
export class RecipeListService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  getRecipeList(id: number): Observable<Category> {
    const token = this.auth.getCurrentAuthToken();

    if (!token) {
      console.warn('Usuario no autenticado. No se puede cargar la lista.');
      return new Observable<Category>();
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Category>(`${API_URL}${id}`, { headers: headers });
  }

  getRecipeLists(): Observable<Category[]> {
    const token = this.auth.getCurrentAuthToken();
    const userId = this.auth.getCurrentUserId();

    if (!token || !userId) {
      console.warn('Usuario no autenticado. No se pueden cargar las recetas.');
      return new Observable<Category[]>(); 
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });

    const params = new HttpParams().set('owner_id', userId.toString());

    return this.http.get<Category[]>(`${API_URL}`, {headers: headers, params: params});
  }

  createRecipeList(newRecipeList: { name: string }): Observable<Category> {
    return this.http.post<Category>(`${API_URL}`, newRecipeList);
  }

  addRecipe(toRecipeListId: number, recipeId: number): Observable<void> {
    const token = this.auth.getCurrentAuthToken();

    if (!token) {
      console.warn('Usuario no autenticado. No se puede agregar la receta.');
      return new Observable<void>();
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<void>(`${API_URL}${toRecipeListId}/add-recipe/${recipeId}`, {}, { headers: headers });
  }

  deleteRecipeList(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
}
