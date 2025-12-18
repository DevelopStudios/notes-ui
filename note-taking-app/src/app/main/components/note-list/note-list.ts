import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { NotesService } from '../../../core/services/notes';
import { map, Observable, Subscription, switchMap } from 'rxjs';
import { Note } from '../../../core/models/note.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-note-list',
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './note-list.html',
  styleUrl: './note-list.css',
})
export class NoteList implements OnInit, AfterViewInit {
  currentStatus: string = 'all';
  collection$!: Observable<Note[]>;
  constructor(
    private noteService: NotesService,
    public route: ActivatedRoute
  ) {
    this.collection$ = this.noteService.notes$;
  }

  ngOnInit(): void {
    this.route.url.subscribe(segments => {
      const path = segments[0]?.path || 'dashboard';

      if(path === 'archived') {
        this.noteService.fetchNotesByQuery({is_acrhived: true});
      } else if(path === 'tags') {
        const tagId = segments[1]?.path;
        this.noteService.fetchNotesByQuery({tag_id: tagId});
      } else {
        this.noteService.refreshNotes();
      }
    });


  //   this.route.url.subscribe(segments => {
  //       const path = segments[0]?.path || 'dashboard';
        
  //       if (path === 'archived') {
  //           // Create a method in service to specifically load archived into the subject
  //           // OR use fetchNotesByQuery({ is_archived: true }) if your API supports it
  //           // For now, let's say we call a refresh method:
  //           this.noteService.fetchNotesByQuery({ is_archived: true }); 
  //       } else if (path === 'tags') {
  //            // Logic to fetch by tag
  //            const tagId = segments[1]?.path;
  //            this.noteService.fetchNotesByQuery({ tag_id: tagId });
  //       } else {
  //            // Default dashboard load
  //            this.noteService.refreshNotes();
  //       }
  //   });
  // }





    // this.collection$ = this.route.url.pipe(
    //   switchMap((segments) => {
    //     const primaryPath = segments.length > 0 ? segments[0].path : 'dashboard';
    //     if (primaryPath === 'archived') {
    //       return this.noteService.getArchivedNotes().pipe(
    //         map((response: any) => response)
    //       );
    //     }
    //     if (primaryPath === 'tags') {
    //       const tagId = segments[1].path;

    //       return this.noteService.getNotesByTag(tagId).pipe(
    //         map(response => response.results)
    //       );
    //     }
    //     return this.noteService.getNotes().pipe(
    //       map(response => response.results)
    //     );
    //   })
    // );
  }

  ngAfterViewInit(): void {
  }

}
