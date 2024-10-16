import { Component, EventEmitter, input, Output } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-card',
  standalone: true,
  imports: [],
  templateUrl: './contact-card.component.html',
  styleUrl: './contact-card.component.css'
})
export class ContactCardComponent {
  contactInfo = input.required<Contact>();
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  onEdit() {
    this.edit.emit()
  }

  onDelete() {
    this.delete.emit()
  }
}
