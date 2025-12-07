import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(m => m.authRoutes)
  },
  { path: '', loadChildren: ()=>import('./main/main.routes').then(m => m.mainRoutes)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation:'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
