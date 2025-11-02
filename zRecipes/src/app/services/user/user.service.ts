import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8000';

export interface UserRegister {
  username: string;
  email: string;
  rut: string;
  region: string;
  comuna: string;
  password: string;
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  rut?: string;
  region: string;
  comuna: string;
  is_admin: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  registerUser(userData: UserRegister): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${API_URL}/users/`, userData);
  }

  getCurrentUser(token: string): Observable<UserResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<UserResponse>(`${API_URL}/users/me`, { headers });
  }
}