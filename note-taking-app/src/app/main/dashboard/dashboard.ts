import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, Observable, startWith, switchMap } from 'rxjs';
import { Note } from '../../core/models/note.model';
import { NotesService } from '../../core/services/notes';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
  currentRoute: string = '';
  constructor(
    private notesService: NotesService, 
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.editorForm = this.fb.group({
      title:['',Validators.required],
      content: ['', Validators.required]
    });
    this.currentRoute = this.router.url;
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      if (id && (!this.selectedNoteId || +id !== this.selectedNoteId)) {
        const noteId = +id;
        this.selectedNoteId = noteId;
        this.notesService.getNoteById(noteId).subscribe(note => {
          this.selectNote(note, true);
        });
      }
    });
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

  selectNote(note: Note, isInitialLoad:boolean = false): void {
    this.selectedNote = note;
    this.selectedNoteId = note.id;

    this.editorForm.patchValue({
      title: note.title,
      content: note.content
    });
    if (!isInitialLoad && window.innerWidth >= 768) {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { id: note.id },
            queryParamsHandling: 'merge'
        });
    }
  }

  private refreshList(): void {
    this.searchControl.setValue(this.searchControl.value);
  }

  loadNotes():void {
    this.notesService.getNotes().subscribe({
      next: (notes: any)=>{
        console.log(notes);
      }
    })
  }

  onNoteClick(note: Note): void {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      this.router.navigate(['/notes', note.id]);
    } else {
      this.selectNote(note); 
    }
  }
  saveNote(): void {
    if (this.selectedNoteId && this.editorForm.valid) {
      const formValue = this.editorForm.value;
      this.notesService.updateNote(this.selectedNoteId, formValue).subscribe(()=> {
        this.refreshList();
      });
    }
  }

  deleteNote(id:number):void {
    if(confirm('Are you sure you want to delete this note')){
      this.notesService.deleteNote(id).subscribe(()=>{
       this.refreshList();
       
       if (this.selectedNoteId === id) {
          this.router.navigate([], {
              relativeTo: this.route,
              queryParams: { id: null },
              queryParamsHandling: 'merge'
          });
          this.selectedNote = null;
          this.selectedNoteId = null;
          this.editorForm.reset();
        }
      });
    }
  }

  cancelEdit():void {
    if(this.selectedNote){
      this.selectNote(this.selectedNote);
    }
  }


}
