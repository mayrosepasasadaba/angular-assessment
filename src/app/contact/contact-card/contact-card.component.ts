import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { Contact } from '../contact.model';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ContactsService } from '../contact.service';

@Component({
  selector: 'app-contact-card',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './contact-card.component.html',
  styleUrl: './contact-card.component.css'
})
export class ContactCardComponent {
  private contactsService = inject(ContactsService);
  contactInfo = input.required<Contact>();
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  formatContactNumber(value: string) {
    return this.contactsService.formatContactNumber(value)
  }

  onEdit() {
    this.edit.emit()
  }

  onDelete() {
    this.delete.emit()
  }
}
