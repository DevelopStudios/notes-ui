import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotesService } from '../../core/services/notes';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-note-editor',
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './note-editor.html',
  styleUrl: './note-editor.css',
})
export class NoteEditor  implements OnInit {
  noteForm: FormGroup;
  isEditMode = false;
  noteId: number | null = null;
  error: string | null = null;

constructor(
    private fb: FormBuilder,
    private notesService: NotesService,
    private router: Router,
    private route: ActivatedRoute
) {
  this.noteForm = this.fb.group({
    title: ['', Validators.required],
    content: ['',Validators.required],
    updated_at: ['']
  });
}

goBack(): void {
  window.history.back();
}

ngOnInit() {
  //Check if thereis an id in the URL.
  const id = this.route.snapshot.paramMap.get('id');
  if(id) {
    this.isEditMode = true;
    this.noteId = +id;
    this.loadNote(this.noteId)
  }
}

deleteNote(): void {
  if (this.noteId && confirm('Are you sure you want to delete this note?')) {
      this.notesService.deleteNote(this.noteId).subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: () => this.error = 'Failed to delete note'
      });
  }
}

loadNote(id:number){
  this.notesService.getNoteById(id).subscribe({
    next: (note) => this.noteForm.patchValue(note),
    error: () => this.error = 'Could not load note'
  });
}

onSubmit(): void {
  if(this.noteForm.invalid) return;
  const noteData = this.noteForm.value;
  if(this.isEditMode && this.noteId) {
    //Update existing note
    this.notesService.updateNote(this.noteId, noteData).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: () => this.error = 'Failed to update note'
    })
  } else {
    //Create new note
    this.notesService.createNote(noteData).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: () => this.error = 'Failed to create note'
    }
      
    )
  }
}

}
