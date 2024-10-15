import { Component, inject, signal } from '@angular/core';
import { ContactsService } from './contact.service';
import { ContactCardComponent } from "./contact-card/contact-card.component";
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ContactCardComponent, NgIf, NgClass],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  private contactsService = inject(ContactsService);
  allContacts = this.contactsService.allContacts();
  isCardView = signal(true);

  onSelectView(type: string) {
    if (type==='card') {
      this.isCardView.set(true)
    } else {
      this.isCardView.set(false)
    }
  }
}
