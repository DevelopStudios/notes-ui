import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Note } from '../../core/models/note.model';
import { NotesService } from '../../core/services/notes';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  // We'll store the notes as an observable
  public notes$!: Observable<Note[]>;

  constructor(private notesService: NotesService, private router: Router) { }

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.notes$ = this.notesService.getNotes().pipe(
      map(paginatedResponse => paginatedResponse.results) // <-- Extract the 'results' array
    );
  }

  editNote(id: number):void {
    this.router.navigate(['/notes', id]);
  }

  deleteNote(id:number):void {
    if(confirm('Are you sure you want to delete this note')){
      this.notesService.deleteNote(id).subscribe(()=>{
        this.loadNotes();
      });
    }
  }
}
