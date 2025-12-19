import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NoteList } from "../components/note-list/note-list";
import { NoteForm } from '../components/note-form/note-form';
import { map, switchMap } from 'rxjs';
import { NotesService } from '../../core/services/notes';


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule, NoteList, NoteForm],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})

export class Dashboard implements OnInit {
  id:string = '';
  private noteService = inject(NotesService);
  private router = inject(Router);
  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route?.url.pipe(map((value)=> {
      if(value[0]?.path === 'create') {
        this.id = 'create';
      } else if(value[0]?.path === 'tags') {
        this.id = 'tags'
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

  archiveNote() {
   this.noteService.archiveNote(this.id).subscribe(value => console.log(value));
  }

  onSearchChange($event: Event) {
    const query = (event?.target as HTMLInputElement).value;
    console.log(query);
  }

  checkNoteId() {
    return this.id !== 'tags' && this.id !== undefined;
  }

}
