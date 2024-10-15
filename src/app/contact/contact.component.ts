import { Component, inject, Input, input, model, signal } from '@angular/core';
import { ContactsService } from './contact.service';
import { ContactCardComponent } from "./contact-card/contact-card.component";
import { NgClass, NgIf } from '@angular/common';
import { NewContactComponent } from "./new-contact/new-contact.component";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ContactCardComponent, NgIf, NgClass, NewContactComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  private contactsService = inject(ContactsService);
  // openAddContact = input()
  // @Input() openAddContact: boolean | undefined;
  openAddContact = model.required<boolean>();

  allContacts = this.contactsService.allContacts();
  isCardView = signal(false);
  // openAddContact = signal(true);

  onSelectView(type: string) {
    if (type==='card') {
      this.isCardView.set(true)
    } else {
      this.isCardView.set(false)
    }
  }

  onOpenAddContact() {
    this.openAddContact.set(true)
  }

  onCloseAddContact() {
    this.openAddContact.set(false)
  }
}
