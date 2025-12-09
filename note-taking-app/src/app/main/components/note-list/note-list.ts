import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NotesService } from '../../../core/services/notes';
import { map, Observable, Subscription, switchMap } from 'rxjs';
import { Note, PaginatedNoteResponse } from '../../../core/models/note.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-note-list',
  imports: [CommonModule],
  templateUrl: './note-list.html',
  styleUrl: './note-list.css',
})
export class NoteList implements OnInit, AfterViewInit {
  currentStatus: string = 'all';
  collection$!: Observable<Note[]>;
  private routeSubscription!: Subscription;

  constructor(
    private noteService: NotesService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.collection$ = this.route.url.pipe(
      switchMap((segments) => {
        const primaryPath = segments.length > 0 ? segments[0].path : 'dashboard';
        if (primaryPath === 'archived') {
          return this.noteService.getArchivedNotes().pipe(
            map((response:any) => response)
          );
        }
        if (primaryPath === 'tags') {
          const tagId = segments[0].parameters['id'];
          console.log(tagId);
          return ''
          // return this.noteService.getNotesByTag(tagId).pipe(
          //   map(response => response.results)
          // );
        }
        return this.noteService.getNotes().pipe(
          map(response => response.results)
        );
      })
    );
  }
  ngAfterViewInit(): void {
  }

}
