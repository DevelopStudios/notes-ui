import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, Observable, startWith, switchMap } from 'rxjs';
import { Note } from '../../core/models/note.model';
import { NotesService } from '../../core/services/notes';
import { Router, RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  public notes$!: Observable<Note[]>;
  public searchControl = new FormControl('');

  constructor(
    private notesService: NotesService, 
    private router: Router
  ) { }

  ngOnInit(): void {


    this.notes$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => {
        const searchTerm = query || '';
        if(searchTerm.trim() === ''){
          return this.notesService.getNotes();
        } else {
          return this.notesService.searchNote(searchTerm);
        }
      }),
      map(response => response.results)
    );
  }

  editNote(id: number):void {
    this.router.navigate(['/notes', id]);
  }

  deleteNote(id:number):void {
    if(confirm('Are you sure you want to delete this note')){
      this.notesService.deleteNote(id).subscribe(()=>{
       this.searchControl.setValue(this.searchControl.value);
      });
    }
  }
}
