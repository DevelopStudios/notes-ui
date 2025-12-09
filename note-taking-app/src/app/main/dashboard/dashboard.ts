import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotesService } from '../../core/services/notes';
import { Note, PaginatedNoteResponse } from '../../core/models/note.model';
import { map, Observable } from 'rxjs';
import { NoteList } from "../components/note-list/note-list";

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule, NoteList],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  constructor() {}

  ngOnInit(): void {
    
  }
 
  onSearchChange($event: Event) {
    const query = (event?.target as HTMLInputElement).value;
    console.log(query);
  }

}
