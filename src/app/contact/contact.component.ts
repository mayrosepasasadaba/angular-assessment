import { Component, inject, Input, input, model, signal } from '@angular/core';
import { ContactsService } from './contact.service';
import { ContactCardComponent } from "./contact-card/contact-card.component";
import { NgClass, NgIf } from '@angular/common';
import { NewContactComponent } from "./new-contact/new-contact.component";
import { Contact } from './contact.model';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ContactCardComponent, NgIf, NgClass, NewContactComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  private contactsService = inject(ContactsService);
  openAddContact = model.required<boolean>();
  action = signal<string>('add');
  defaultFormValues = signal<Contact>({
    id: '',
    name: '',
    email: '',
    contact_no: ''
  })

  allContacts = this.contactsService.allContacts();
  isCardView = signal(true);

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
    this.defaultFormValues.set({
      id: '',
      name: '',
      email: '',
      contact_no: ''
    })
    this.openAddContact.set(false)
  }

  onEditCard(info: Contact) {
    this.defaultFormValues.set(info)
    this.action.set('edit')
    this.openAddContact.set(true);
  }

  onDeleteCard(info: Contact) {
    console.log(info)
    alert("DELETE ID: "+info.id)
  }
}
