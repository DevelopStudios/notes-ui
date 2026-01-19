import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotesService } from '../../../core/services/notes';
import { Note, NotePayload } from '../../../core/models/note.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { ToastService } from '../../../core/services/toast';

@Component({
  selector: 'app-note-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './note-form.html',
  styleUrl: './note-form.css',
})
export class NoteForm implements OnInit,OnDestroy {
  private fb = inject(FormBuilder);
  private noteService = inject(NotesService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private saveEventSub!: Subscription;
  private toast = inject(ToastService);
  tags: string[] = [];
  noteId: string | null = null;
  selectedNote: Note | null = null;
  noteForm: FormGroup = this.fb.group({
    id: [],
    title: ['', Validators.required],
    tags: [''],
    content: ['', Validators.required],
    is_archived: [false]
  });
  constructor() {}

  ngOnDestroy(): void {
    this.noteService.formActive.next(null);
    this.saveEventSub.unsubscribe();
  }

  ngOnInit(): void {

    this.route.paramMap.pipe(
      switchMap(params => {
        if(params.get('noteId') !== null) {
          let id = params.get('noteId');
          this.noteService.formActive.next(id);
          let string = id?.toString();
          this.getNote(string);
        } else {
          this.noteId = params.get('id');
          this.noteService.formActive.next(this.noteId);
          if (this.noteId) {
            this.getNote(this.noteId);
          }
        }
        return ''
      })
    ).subscribe();
    this.saveEventSub = this.noteService.saveAction$.subscribe(value => {
      this.saveNote();
    });
  }

  saveNote(): void {
    let id = this.noteForm.get('id')?.value;
    const formValue = this.noteForm.value;
    const tagArray = formValue.tags
      ? formValue.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag.length > 0)
      : [];
    const payload: NotePayload = {
      title: formValue.title,
      content: formValue.content,
      is_archived: formValue.is_archived,
      tag_names: tagArray,
    };
    if (this.noteForm.invalid) {
      this.toast.show('Error, form is invalid','error');
      return;
    }
    if (id !== null) {
      this.noteService.updateNote(id, payload).subscribe({
        next: (response:any) => {
          delete response.user;
          delete response.created_at;
          delete response.updated_at;
          this.noteForm.setValue(response);
          this.toast.show('Note updated successfully!','success');
          this.noteForm.reset({ is_archived: false });
          this.router.navigate(['./dashboard']);
        },
        error: (error) => {
          this.toast.show('Error saving note','error')
        }
      });
    } else {
      this.noteService.createNote(payload).subscribe(
      (value => {
        this.noteForm.reset({ is_archived: false });
        this.toast.show('Note saved successfully','success');
        this.router.navigate(['./dashboard']);
      }));
    }
  }

  cancelNote() {
        this.router.navigate(['./dashboard']);   
  }

 getNote(id: any) {
  this.noteService.getNoteById(id).subscribe({
    next: (data) => {
      setTimeout(() => {
        this.selectedNote = data;
        const tagsString: string = data.tags ? data.tags.map((tag: any) => tag.name).join(', ') : '';
        this.noteForm.patchValue(data);
        this.noteForm.get('tags')?.patchValue(tagsString);
      }, 0);
    },
    error: (err) => {
      this.toast.show(err.message, 'error');
    }
  });
}

}
