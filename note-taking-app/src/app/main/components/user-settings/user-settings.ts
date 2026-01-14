import { CommonModule } from '@angular/common';
import { Component, inject} from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { NotesService } from '../../../core/services/notes';

@Component({
  selector: 'app-user-settings',
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './user-settings.html',
  styleUrl: './user-settings.css',
})

export class UserSettings {
constructor(private router: Router){}
private noteService = inject(NotesService);

togglePasswordChange(){
  this.noteService.togglehideSidebar();
}

userLogout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['./auth/login']);
}
}
