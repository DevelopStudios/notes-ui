import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Sidebar } from '../components/sidebar/sidebar';
import { BottomNav } from '../components/bottom-nav/bottom-nav';
import { ToastComponent } from "../../core/modals/toast";

@Component({
  selector: 'app-shell',
  imports: [CommonModule, RouterModule, Sidebar, BottomNav, ToastComponent],
  templateUrl: './shell.html',
  styleUrl: './shell.css',
})
export class Shell {
constructor(
    private authService: AuthService,
    private router: Router
  ) {
    
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
