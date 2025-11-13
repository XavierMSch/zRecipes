import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

const API_URL = 'http://localhost:8000'; 
interface AuthState {
  userId: number | null;
  authToken: string | null;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {  
  private authSubject = new BehaviorSubject<AuthState>({ 
    userId: null, 
    authToken: null 
  });
  public authState$: Observable<AuthState> = this.authSubject.asObservable();
  public isLoggedIn$: Observable<boolean> = this.authState$.pipe(
    map(state => !!state.authToken && !!state.userId)
  );

  constructor(private http: HttpClient) {
    this.loadInitialState();
  }

  private loadInitialState(): void {
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      this.authSubject.next({ userId: Number(userId), authToken: token });
    }
  }

  loginWithCredentials(email: string, password: string): Observable<boolean> {
    const formData = new URLSearchParams();
    formData.set('username', email); 
    formData.set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<LoginResponse>(`${API_URL}/token`, formData.toString(), { headers })
      .pipe(
        tap(response => {
          const payload = JSON.parse(atob(response.access_token.split('.')[1]));
          const userId = parseInt(payload.sub);
          
          this.login(userId, response.access_token);
        }),
        map(() => true)
      );
  }

  login(userId: number, token: string): void {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userId', userId.toString());

    this.authSubject.next({ userId, authToken: token });
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');

    this.authSubject.next({ userId: null, authToken: null });
  }

  changePassword(currentPassword: string, newPassword: string): Observable<void> {
    const token = this.getCurrentAuthToken();
    const userId = this.getCurrentUserId();
    if (!token || !userId) {
      return new Observable<void>(observer => {
        observer.error('Usuario no autenticado');
      });
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const body = {
      old_password: currentPassword,
      new_password: newPassword
    };
    return this.http.put<void>(`${API_URL}/change-password`, body, { headers });
  }

  getCurrentUserId(): number | null {
    return this.authSubject.value.userId;
  }    

  getCurrentAuthToken(): string | null{
    return this.authSubject.value.authToken;
  }
  
}
