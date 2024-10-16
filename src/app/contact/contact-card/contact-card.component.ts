import { Component, EventEmitter, input, Output } from '@angular/core';
import { Contact } from '../contact.model';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-contact-card',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './contact-card.component.html',
  styleUrl: './contact-card.component.css'
})
export class ContactCardComponent {
  contactInfo = input.required<Contact>();
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  formatContactNumber(value: string) {
      if (!value) return value;
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length !== 11) return value;
      const formatted = `${cleaned.slice(0, 4)}-${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9, 11)}`;
      return formatted;
  }

  onEdit() {
    this.edit.emit()
  }

  onDelete() {
    this.delete.emit()
  }
}
