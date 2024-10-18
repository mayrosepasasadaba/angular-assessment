import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertSubject = new Subject<{ message: string; type: 'success' | 'error' | 'warning' | 'info' }>();
  private isVisible = signal(false);
  alert$ = this.alertSubject.asObservable();
  isVisible$ = new BehaviorSubject<boolean>(this.isVisible());

  showAlert(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') {
    this.alertSubject.next({ message, type });
    this.isVisible.set(true);
    this.isVisible$.next(true);
    setTimeout(() => {
      this.clearAlert()
    }, 2000)
  }

  clearAlert() {
    this.alertSubject.next({ message: '', type: 'info' });
    this.isVisible.set(false);
    this.isVisible$.next(false);
  }
}
