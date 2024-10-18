import { ChangeDetectionStrategy, Component, inject, Input, input, model, signal } from '@angular/core';
import { ContactsService } from './contact.service';
import { ContactCardComponent } from "./contact-card/contact-card.component";
import { NgClass, NgFor, NgIf } from '@angular/common';
import { NewContactComponent } from "./new-contact/new-contact.component";
import { Contact } from './contact.model';
import { Observable, Subscription } from 'rxjs';
import { AlertService } from '../shared/alert/alert.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ContactCardComponent, NgIf, NgClass, NgFor, NewContactComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {

  private contactsService = inject(ContactsService);
  private alertService = inject(AlertService);
  
  
  openAddContact = signal(false);
  action = signal<string>('add');
  defaultFormValues = signal<Contact>({
    id: '',
    name: '',
    email: '',
    contact_no: ''
  })

  isCardView = signal(true);
  allContacts = this.contactsService.allContacts();

  ngOnInit(): void {
    // Subscribe to the contacts$ observable to get real-time updates
    this.contactsService.contacts$.subscribe(
      (updatedContacts) => {
        this.allContacts = updatedContacts;
      }
    );
  }

  onSelectView(type: string) {
    if (type==='card') {
      this.isCardView.set(true)
    } else {
      this.isCardView.set(false)
    }
  }

  onOpenAddContact() {
    this.alertService.showAlert("Successfully added a new contact!", "error")
    // this.action.set('add')
    // this.openAddContact.set(true);
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
    this.contactsService.deleteContact(info.id)
  }
}
