import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotesService } from '../../core/services/notes';
import { Note, PaginatedNoteResponse } from '../../core/models/note.model';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit, AfterViewInit {
  collection$!: Observable<Note[]>;
  constructor(private noteService: NotesService) {}

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.getCollection();
  }

  getCollection():void { 
    this.collection$ = this.noteService.getNotes().pipe(map((response: PaginatedNoteResponse)=> response.results))
  }

  onSearchChange($event: Event) {
    const query = (event?.target as HTMLInputElement).value;
    console.log(query);
  }

}
