import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotesService } from '../../../core/services/notes';
import { NotePayload } from '../../../core/models/note.model';

@Component({
  selector: 'app-note-form',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './note-form.html',
  styleUrl: './note-form.css',
})
export class NoteForm {
  private fb = inject(FormBuilder);
  private noteService = inject(NotesService);
  noteForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    tags: [''], // Use a single string control for the tags input
    content: ['', Validators.required],
    is_archived: [false]
  });
  constructor(){

  }

  saveNote(): void {
    if (this.noteForm.invalid) {
      console.error('Form is invalid. Cannot save note.');
      return;
    }

    const formValue = this.noteForm.value;

    // 1. Convert the comma-separated string of tags into an array of strings
    const tagArray = formValue.tags
      ? formValue.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag.length > 0)
      : [];

    // 2. Map the local form structure to the desired backend payload structure
    const payload: NotePayload = {
      title: formValue.title,
      content: formValue.content,
      is_archived: formValue.is_archived,
      tag_names: tagArray,
    };
    this.noteService.createNote(payload).subscribe({
      next: (response) => {
        console.log('Note saved successfully!', response);
        // Optionally, reset the form
        this.noteForm.reset({ is_archived: false });
      },
      error: (error) => {
        console.error('Error saving note:', error);
        // Handle error display
      }
    });
  }
  
}
