import { ChangeDetectionStrategy, Component, inject, Input, input, model, signal } from '@angular/core';
import { ContactsService } from './contact.service';
import { ContactCardComponent } from "./contact-card/contact-card.component";
import { NgClass, NgFor, NgIf } from '@angular/common';
import { NewContactComponent } from "./new-contact/new-contact.component";
import { Contact } from './contact.model';
import { Observable, Subscription } from 'rxjs';
import { AlertService } from '../shared/alert/alert.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ContactCardComponent, NgIf, NgClass, NgFor, NewContactComponent, RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {

  private contactsService = inject(ContactsService);
  private alertService = inject(AlertService);
  
  openFormModal = signal(false);
  action = signal<'add'|'edit'>('add');
  isCardView = signal(true);
  allContacts = this.contactsService.allContacts();
  defaultFormValues = signal<Contact>({
    id: '',
    name: '',
    email: '',
    contact_no: ''
  })
  

  ngOnInit(): void {
    // Subscribe to the contacts$ observable to get real-time updates
    this.contactsService.contacts$.subscribe(
      (updatedContacts) => {
        this.allContacts = updatedContacts;
      }
    );
  }

  // selects between card view or table view
  onSelectViewType(type: string) {
    if (type==='card') {
      this.isCardView.set(true)
    } else {
      this.isCardView.set(false)
    }
  }

  // function to open add modal
  onOpenFormModal() {
    this.action.set('add');
    this.openFormModal.set(true);
  }

  // closes add modal; resets form values
  onCloseFormModal() {
    this.defaultFormValues.set({
      id: '',
      name: '',
      email: '',
      contact_no: ''
    })
    this.openFormModal.set(false)
  }

  // opens edit form modal; set default values of form to selected info
  onEditContact(info: Contact) {
    this.defaultFormValues.set(info)
    this.action.set('edit')
    this.openFormModal.set(true);
  }

  // function to delete contact info
  onDeleteContact(info: Contact) {
    this.contactsService.deleteContact(info.id);
    this.alertService.showAlert("Successfully deleted contact!", "success");
  }
}
