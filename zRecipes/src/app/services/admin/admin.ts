import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../../interfaces/recipe.interface';
import { Report } from '../../interfaces/report.interface';
import { AuthService } from '../auth/auth';

const API_URL = 'http://localhost:8000/reports/'

@Injectable({
  providedIn: 'root'
})
export class AdminService {
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
  
  getReports(): Observable<Report[]> {
    const token = this.auth.getCurrentAuthToken();
    const userId = this.auth.getCurrentUserId();

    if (!token || !userId) {
      throw new Error('User is not authenticated');
    }
    const headers = this.getAuthHeaders();
    return this.http.get<Report[]>(`${API_URL}`, { headers: headers});
  }
}
