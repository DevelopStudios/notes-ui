import { Component, inject, OnInit } from '@angular/core';
import { NotesService } from '../../../core/services/notes';
import { PaginatedTagResponse, Tag } from '../../../core/models/note.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tags-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './tags-list.html',
  styleUrl: './tags-list.css',
})
export class TagsList implements OnInit{
  private noteService = inject(NotesService);
  tags$ = this.noteService.getTags();

  ngOnInit(): void {
  }
  
}
