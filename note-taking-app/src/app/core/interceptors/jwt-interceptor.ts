// src/app/core/interceptors/jwt.interceptor.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core'; // <-- Import Inject & PLATFORM_ID
import { isPlatformBrowser } from '@angular/common'; // <-- Import isPlatformBrowser
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object // <-- Inject the Platform ID
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this.authService.getAccessToken();
    const isApiUrl = request.url.startsWith(environment.apiUrl);

    if (accessToken && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          const isLoginRequest = request.url.endsWith('token/');
          if (!isLoginRequest && isPlatformBrowser(this.platformId)) {
            this.authService.logout();
            this.router.navigate(['/auth/login']);
          }
        }
        return throwError(() => error);
      })
    );
  }
}