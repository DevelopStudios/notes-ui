import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-overlay" (click)="onClose()">
      
      <div class="modal-container" (click)="$event.stopPropagation()">
        
        @if(title) {
          <div class="modal-header">
            <h3>{{ title }}</h3>
            <button class="close-btn" (click)="onClose()">&times;</button>
          </div>
        }

        <div class="modal-content">
          <ng-content></ng-content>
        </div>

      </div>
    </div>
  `,
  styles: [`
    /* 1. The Full Screen Overlay */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.5); /* Dim background */
      backdrop-filter: blur(2px); /* Optional: Modern blur effect */
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2000; /* High z-index to sit on top of everything */
      animation: fadeIn 0.2s ease-out;
    }

    /* 2. The Modal Box */
    .modal-container {
      background: white;
      width: 90%;
      max-width: 500px;
      padding: 24px;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      position: relative;
      animation: slideUp 0.3s ease-out;
    }

    /* 3. Header & Typography */
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    h3 {
      margin: 0;
      font-family: 'Inter', sans-serif;
      font-size: 1.25rem;
      font-weight: 600;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #6B7280;
    }

    /* Animations */
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `]
})
export class ModalComponent {
  @Input() title: string = '';
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  // Close on Escape key
//   @HostListener('document:keydown.escape', ['$event'])
//   onEscKey(event: KeyboardEvent) {
//     this.onClose();
//   }
}