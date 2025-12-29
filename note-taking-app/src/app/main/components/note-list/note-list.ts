import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../../core/services/notes';
import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, map, Observable } from 'rxjs';
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
  private searchTerm$ = new BehaviorSubject<string>('');
  filteredCollection$!: Observable<Note[]>;
  currentStatus: string = 'all';
  collection$!: Observable<Note[]>;
  partentUrl:string = '';
  constructor(
    private noteService: NotesService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.filteredCollection$ = combineLatest([
      this.noteService.notes$,
      this.noteService.searchTerm$.pipe( 
        debounceTime(300),
        distinctUntilChanged()
      )
    ]).pipe(
      map(([notes, term]) => {
        if (!term.trim()) return notes;
        const lowTerm = term.toLowerCase();
        return notes.filter(note => 
          note.title.toLowerCase().includes(lowTerm) || 
          note.content.toLowerCase().includes(lowTerm) ||
          note.tags.some(t => t.name.toLowerCase().includes(lowTerm))
        );
      })
    );
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

  updateSearch(term: string) {
    this.searchTerm$.next(term);
  }

}
