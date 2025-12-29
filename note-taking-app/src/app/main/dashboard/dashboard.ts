import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NoteList } from "../components/note-list/note-list";
import { NoteForm } from '../components/note-form/note-form';
import { map, Observable, switchMap } from 'rxjs';
import { NotesService } from '../../core/services/notes';
import { Tag } from '../../core/models/note.model';


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule, NoteList, NoteForm],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})

export class Dashboard implements OnInit {
  id:string = '';
  tages$: Observable<Tag[]>;
  tagList:any;
  tagName: string = '';
  activeRoute: string = '';
  private noteService = inject(NotesService);
  private router = inject(Router);
  constructor(
    private route: ActivatedRoute,
  ) { 
    this.tages$ = this.noteService.tags$;
  }

  ngOnInit(): void {
    this.tages$.subscribe(value => {
      this.tagList = value;
    });
    this.route?.url.pipe(map((value)=> {
      this.activeRoute = value[0]?.path;
      if(value[0]?.path === 'create') {
        this.id = 'create';
      } else if(value[0]?.path === 'tags') {
        
        if(value[2]){
          this.id = 'tags/note'
        } else {
          if(value[1]?.path) {
            this.findActiveTag(value[1]?.path);
          }
          this.id = 'tags'
        }
      } else {
        this.id = value[1]?.path;
      }
    })).subscribe();
  }

  deleteNote() {
    this.noteService.deleteNote(this.id).subscribe({
      next:(value)=>{
        this.router.navigate(['/dashboard']);
      }
    })
  }

  findActiveTag(id:any) {
    let idNum = Number(id);
    let found = this.tagList.filter((value:Tag) => {
      return value.id === idNum;
    });
    this.tagName = found[0].name;
  }

  archiveNote() {
   this.noteService.archiveNote(this.id).subscribe(value => console.log(value));
  }

  restoreNote() {
    this.noteService.RestoreNote(this.id).subscribe(value => console.log(value));
  }

  onSearchChange($event: Event) {
    const query = (event?.target as HTMLInputElement).value;
    console.log(query);
  }

  checkNoteId() {
    return this.id !== undefined && this.id !== 'tags';
  }

}
