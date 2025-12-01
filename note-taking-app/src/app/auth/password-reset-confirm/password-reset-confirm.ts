import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-password-reset-confirm',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './password-reset-confirm.html',
  styleUrl: './password-reset-confirm.css',
})
export class PasswordResetConfirm implements OnInit {
  confirmForm: FormGroup;
  uid: string = '';
  token: string = '';
  message: string | null = null;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.confirmForm = this.fb.group({
      new_password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.uid = this.route.snapshot.paramMap.get('uid') || '';
    this.token = this.route.snapshot.paramMap.get('token') || '';

    if(!this.uid || !this) {
      this.error = 'Invalid password reset link.';
    }
  }

  onSubmit():void {
    if(this.confirmForm.invalid) return;
    const data = {
      uid: this.uid,
      token: this.token,
      new_password: this.confirmForm.value.new_password
    }

    this.authService.confirmPasswordReset(data).subscribe({
      next: ()=> {
        this.message = 'Password reset successful! Redirecting to login...';
        setTimeout(()=> this.router.navigate(['/auth/login']), 3000);
      },
      error: () => {
        this.error = 'The reset link is invalid or expired.';
      }
    })
  }
}
