import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotesService } from '../../core/services/notes';
import { Note, PaginatedNoteResponse } from '../../core/models/note.model';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  collection: Note[]=[]
  constructor(private noteService: NotesService) {}

  ngOnInit(): void {
    this.getCollection();
  }

  getCollection():void { 
    this.noteService.getNotes().subscribe((value:PaginatedNoteResponse) => {
      console.log(value.results);
      this.collection = value.results;
    });
  }
  onSearchChange($event: Event) {
    const query = (event?.target as HTMLInputElement).value;
    console.log(query);
  }

}
