import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastData {
  message: string;
  actionLabel?: string;
  actionRoute?: string;
  type: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastSubject = new BehaviorSubject<ToastData | null>(null);
  toast$ = this.toastSubject.asObservable();
  private timeoutId: any;

  show(message: string, type: string, actionLabel?: string, actionRoute?: string) {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    this.toastSubject.next({ message, actionLabel, actionRoute, type });
    this.timeoutId = setTimeout(() => {
      this.hide();
    }, 4000);
  }

  hide() {
    this.toastSubject.next(null);
  }

}