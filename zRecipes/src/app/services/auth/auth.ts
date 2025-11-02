import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface AuthState {
  userId: number | null;
  authToken: string | null;
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

  constructor() {
    // Intenta cargar el estado desde localStorage al inicio, si existe
    this.loadInitialState();
  }

  private loadInitialState(): void {
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      this.authSubject.next({ userId: Number(userId), authToken: token });
    }
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

  getCurrentUserId(): number | null {
    return this.authSubject.value.userId;
  }

  getCurrentAuthToken(): string | null{
    return this.authSubject.value.authToken;
  }
}
