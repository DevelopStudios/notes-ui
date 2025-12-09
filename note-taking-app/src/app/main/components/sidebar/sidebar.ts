import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotesService } from '../../../core/services/notes';
import { PaginatedNoteResponse, PaginatedTagResponse, Tag } from '../../../core/models/note.model';
import { response } from 'express';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule,CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {
  tags$!: Observable<Tag[]>;
  constructor(private notesService: NotesService){

  }

  ngOnInit(): void {
    this.getTags();
  }

  getTags(){
    this.tags$ = this.notesService.getTags().pipe(
      map((response: PaginatedTagResponse)=> response.results)
    );
  }


}
