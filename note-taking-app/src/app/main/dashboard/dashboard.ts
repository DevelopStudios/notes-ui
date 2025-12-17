import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NoteList } from "../components/note-list/note-list";
import { NoteForm } from '../components/note-form/note-form';
import { map } from 'rxjs';
import { NotesService } from '../../core/services/notes';


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule, NoteList, NoteForm],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})

export class Dashboard implements OnInit {
  id:string = '';
  
  constructor(
    private route: ActivatedRoute,
    private noteService: NotesService
  ) { }

  ngOnInit(): void {
    this.route?.url.pipe(map((value)=> {
      this.id = value[1]?.path;
    })).subscribe();
  }

  deleteNote() {
    console.log(this.id);
    this.noteService.deleteNote(this.id).subscribe({
      next:(value)=>{
        console.log(value);
      }
    })
  }

  archiveNote() {
   this.noteService.archiveNote(this.id).subscribe({
    next: (value)=> {
      console.log(value);
    }
   })
  }

  onSearchChange($event: Event) {
    const query = (event?.target as HTMLInputElement).value;
    console.log(query);
  }

}
