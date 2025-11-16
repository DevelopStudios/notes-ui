import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Note } from '../../core/models/note.model';
import { NotesService } from '../../core/services/notes';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  // We'll store the notes as an observable
  public notes$!: Observable<Note[]>;

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.notes$ = this.notesService.getNotes().pipe(
      map(paginatedResponse => paginatedResponse.results) // <-- Extract the 'results' array
    );
  }
}
