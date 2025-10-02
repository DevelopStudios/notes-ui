// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

interface TokenResponse {
  refresh: string;
  access: string;
}

interface UserCredentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';

  constructor(private http: HttpClient) { }

  /** Authentication Calls **/

  login(credentials: UserCredentials): Observable<TokenResponse> {
    // Note: The endpoint is 'token/' for JWT Simple authentication
    return this.http.post<TokenResponse>(`${this.apiUrl}token/`, credentials).pipe(
      tap(response => {
        this.setTokens(response.access, response.refresh);
      })
    );
  }

  register(credentials: UserCredentials): Observable<any> {
    // Note: The endpoint should be '/register/' or similar in your Django setup
    return this.http.post<any>(`${this.apiUrl}users/register/`, credentials);
  }

  /** Token Management **/

  private setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  logout(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }
}