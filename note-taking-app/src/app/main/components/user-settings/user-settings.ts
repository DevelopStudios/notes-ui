import { Component, inject } from '@angular/core';
import { NotesService } from '../../../core/services/notes';
import { Router } from 'express';

@Component({
  selector: 'app-user-settings',
  imports: [],
  templateUrl: './user-settings.html',
  styleUrl: './user-settings.css',
})
export class UserSettings {
  private notesService = inject(NotesService)
  private router = inject(Router)
  userLogout() {
    console.log(true);
    // localStorage.removeItem('token'); 
    // this.router.navigate(['/login']);
    // this.notesService.userLogout().subscribe(value => {
    //   console.log(value);
    // });
  }
}
