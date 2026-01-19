import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ToastService } from '../services/toast'; // Adjust path
import { animate, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    @if (toastService.toast$ | async; as toast) {
      <div class="toast-container" @slideInOut>
        @if(toast?.type === 'error') {
        <div class="icon-wrapper error">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#EF4444"/> <path d="M12 8V12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 16H12.01" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          } @else if(toast?.type === 'success'){
          <div class="icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          }
        <span class="toast-message">{{ toast.message }}</span>
        @if (toast?.actionLabel) {
          <a class="toast-action" 
             (click)="navigate(toast?.actionRoute!)">
             {{ toast?.actionLabel }}
          </a>
        }
        <button class="close-btn" (click)="toastService.hide()">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    }
  `,
  styles: [`
    .toast-container {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%); /* Center horizontally */
      
      display: flex;
      align-items: center;
      gap: 12px;
      
      background: white;
      padding: 12px 16px;
      border-radius: 12px;
      border: 1px solid #E5E7EB; /* Light border */
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); /* Soft shadow */
      
      z-index: 3000; /* Above modals */
      min-width: 450px;
      max-width: 90vw;
    }

    /* Green Check Icon */
    .icon-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      background-color: #22C55E;
      border-radius: 50%;
      color: white;
      flex-shrink: 0;
    }
    .error {
      background-color: #EF4444;
    }

    
    
    .icon-wrapper svg {
      width: 14px;
      height: 14px;
    }

    /* Message Text */
    .toast-message {
      color: #111827; /* Dark text */
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      font-weight: 500;
      flex-grow: 1; /* Push action to the right */
    }

    /* Action Link */
    .toast-action {
      color: #1F2937;
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      font-weight: 600; /* Slightly bolder */
      text-decoration: underline;
      cursor: pointer;
      white-space: nowrap;
      margin-left: 8px;
    }

    .toast-action:hover {
      color: #000;
    }

    /* Close Button */
    .close-btn {
      background: none;
      border: none;
      color: #9CA3AF;
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 0;
      margin-left: 8px;
      width: 19px;
    }
    
    .close-btn:hover {
      color: #4B5563;
    }
  `],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translate(-50%, 100%)', opacity: 0 }),
        animate('300ms cubic-bezier(0.16, 1, 0.3, 1)', style({ transform: 'translate(-50%, 0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translate(-50%, 50%)', opacity: 0 }))
      ])
    ])
  ]
})
export class ToastComponent {
  toastService = inject(ToastService);
  private router = inject(Router);

  navigate(route: string) {
    if (route) {
      this.router.navigate([route]);
      this.toastService.hide();
    }
  }
}