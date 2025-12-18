import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotesService } from '../../../core/services/notes';
import { Tag } from '../../../core/models/note.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule,CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {
  tags$!: Observable<Tag[]>;
  constructor(private notesService: NotesService){
  this.tags$ = this.notesService.tags$;
  }

  ngOnInit(): void {
    this.notesService.refreshTags();
  }

}
