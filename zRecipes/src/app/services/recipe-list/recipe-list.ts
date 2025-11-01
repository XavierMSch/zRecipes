import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../interfaces/category.interface';
import { AuthService } from '../auth/auth';

const API_URL = 'apiurl/recipe-lists'

@Injectable({
  providedIn: 'root'
})
export class RecipeListService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  getRecipeList(id: number): Observable<Category> {
    return this.http.get<Category>(`${API_URL}/${id}`);
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

  createRecipeList(newRecipeList: Omit<Category, 'id'>): Observable<Category> {
    return this.http.post<Category>(`${API_URL}`, newRecipeList);
  }

  updaterecipeList(recipeList: Category): Observable<Category> {
    return this.http.put<Category>(`${API_URL}/${recipeList.id}`, recipeList); 
  }

  deleteRecipeList(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
}
