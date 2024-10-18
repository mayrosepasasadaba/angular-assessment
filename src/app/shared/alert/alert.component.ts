import { Component, inject, OnInit, signal } from '@angular/core';
import { AlertService } from './alert.service';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  imports: [NgClass, NgIf],
})
export class AlertComponent implements OnInit {
  private alertService = inject(AlertService);
  message = signal<string>('');
  isVisible = signal(true);
  alertType = signal<'success' | 'error' | 'warning' | 'info'>('info');

  ngOnInit() {
    this.alertService.alert$.subscribe((alert) => {
      this.message.set(alert.message);
      this.alertType.set(alert.type);
    });

    this.alertService.isVisible$.subscribe((alert) => {
      this.isVisible.set(true);
    });
  }
}
