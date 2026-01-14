import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotesService } from '../../../core/services/notes';

@Component({
  selector: 'app-change-password',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css',
})
export class ChangePassword {
  private fb = inject(FormBuilder);
  private noteService = inject(NotesService);
  // Form setup with validators
  passwordForm = this.fb.group({
    oldPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required]
  });

  // Visibility states for the 3 fields
  showOld = false;
  showNew = false;
  showConfirm = false;

  toggleVisibility(field: 'old' | 'new' | 'confirm') {
    if (field === 'old') this.showOld = !this.showOld;
    if (field === 'new') this.showNew = !this.showNew;
    if (field === 'confirm') this.showConfirm = !this.showConfirm;
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      let data = {
        "old_password": this.passwordForm.value.oldPassword,
        "new_password": this.passwordForm.value.newPassword
      }
      this.noteService.changePassword(data).subscribe();
    }
  }
}
