import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { PasswordResetRequest } from './password-reset-request/password-reset-request';
import { PasswordResetConfirm } from './password-reset-confirm/password-reset-confirm';


export const authRoutes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'forgot-password', component: PasswordResetRequest},
  { path: 'reset-password/:uid/:token', component: PasswordResetConfirm},
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];