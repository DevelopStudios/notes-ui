import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../../core/services/notes';
import { Observable } from 'rxjs';
import { Note } from '../../../core/models/note.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-note-list',
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './note-list.html',
  styleUrl: './note-list.css',
})
export class NoteList implements OnInit {
  currentStatus: string = 'all';
  collection$!: Observable<Note[]>;
  partentUrl:string = '';
  constructor(
    private noteService: NotesService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    this.collection$ = this.noteService.notes$;
  }

  ngOnInit(): void {
    this.route.url.subscribe(segments => {
      const path = segments[0]?.path || 'dashboard';
      if(path === 'archived') {
        this.partentUrl = 'archived';
        this.noteService.getArchivedNotes();
      } else if(path === 'tags') {
        this.partentUrl = `${segments[0].path}/${segments[1].path}/`
        const tagId = segments[1]?.path;
        this.noteService.fetchNotesByQuery({tag_id: tagId});
      } else if(path ==='create') {

      }
      else {
        this.partentUrl = 'dashboard'
        this.noteService.refreshNotes();
      }
    });
  }

}
