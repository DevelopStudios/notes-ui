import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-settings',
  imports: [CommonModule, RouterModule],
  templateUrl: './user-settings.html',
  styleUrl: './user-settings.css',
})

export class UserSettings {
constructor(private router: Router){}
  userLogout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['./auth/login']);
  }
}
