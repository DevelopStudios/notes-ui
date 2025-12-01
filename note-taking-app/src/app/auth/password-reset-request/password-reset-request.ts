import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-password-reset-request',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './password-reset-request.html',
  styleUrl: './password-reset-request.css',
})
export class PasswordResetRequest {
  requestForm: FormGroup;
  message: string | null = null;
  error: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService){
    this.requestForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  onSubmit(): void {
    if(this.requestForm.invalid) return;
    this.message = null;
    this.error = null;

    this.authService.requestPasswordReset(this.requestForm.value.email).subscribe({
      next: ()=> {
        this.message = 'If an account exists with that email, we have sent a reset link.';
        this.requestForm.reset();
      },
      error: ()=> {
        this.message = 'If an account exists with that email. we have sent a reset link.';
      }
    })
  }
}
