import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NotesService } from '../../../core/services/notes';

@Component({
  selector: 'app-bottom-nav',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './bottom-nav.html',
  styleUrl: './bottom-nav.css',
})

export class BottomNav {
  private noteService = inject(NotesService); 
  navItemPress() {
    this.noteService.emitNavItemPress();
  }
}
