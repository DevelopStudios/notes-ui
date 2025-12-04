import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, Observable, startWith, switchMap } from 'rxjs';
import { Note } from '../../core/models/note.model';
import { NotesService } from '../../core/services/notes';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  public notes$!: Observable<Note[]>;
  public searchControl = new FormControl('');
  selectedNote: Note | null = null;
  selectedNoteId: number | null = null;
  editorForm: FormGroup;
  constructor(
    private notesService: NotesService, 
    private router: Router, private fb: FormBuilder
  ) {
    this.editorForm = this.fb.group({
      title:['',Validators.required],
      content: ['', Validators.required]
    });
  }

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

  selectNote(note: Note): void {
    this.selectedNote = note;
    this.selectedNoteId = note.id;

    this.editorForm.patchValue({
      title: note.title,
      content: note.content
    });
  }

  loadNotes():void {
    this.notesService.getNotes().subscribe({
      next: (notes: any)=>{
        console.log(notes);
      }
    })
  }

  saveNote(): void {
    if (this.selectedNoteId && this.editorForm.valid) {
      const formValue = this.editorForm.value;
      this.notesService.updateNote(this.selectedNoteId, formValue).subscribe(()=> {
        this.loadNotes();
        alert('Note saved');
      });
    }
  }

  deleteNote(id:number):void {
    if(confirm('Are you sure you want to delete this note')){
      this.notesService.deleteNote(id).subscribe(()=>{
       this.searchControl.setValue(this.searchControl.value);
      });
    }
  }

  cancelEdit():void {
    if(this.selectedNote){
      this.selectNote(this.selectedNote);
    }
  }

}
