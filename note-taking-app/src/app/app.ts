import { Component, signal } from '@angular/core';
import { NotesService } from './core/services/notes';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('note-taking-app');
}
