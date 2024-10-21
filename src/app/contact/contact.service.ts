import { Injectable, signal } from '@angular/core';
import { Contact, NewContact } from './contact.model';
import { BehaviorSubject } from 'rxjs';

const defaultContacts = [
  {
    id: "1",
    name: 'Jay Contreras',
    email: 'kamikazeegod@gmail.com',
    contact_no: '09171234567',
  },
  {
    id: "2",
    name: 'Jason Astete',
    email: 'jason_the_menace@gmail.com',
    contact_no: '09206002222',
  },
  {
    id: "3",
    name: 'Mikki Jill',
    email: 'keyboardista@gmail.com',
    contact_no: '09206002222',
  },
  {
    id: "4",
    name: 'Jose Luis Linao',
    email: 'kamikazeeprince@gmail.com',
    contact_no: '09171234456',
  },
  {
    id: "5",
    name: 'Allan Burdeos',
    email: 'allan_burdeos@gmail.com',
    contact_no: '09176666666',
  },
  {
    id: "6",
    name: 'Mark Estacio',
    email: 'mark_estacio@gmail.com',
    contact_no: '09176666666',
  },
  {
    id: "7",
    name: 'Jianelli Lubiano',
    email: 'kamikazeeprincess@gmail.com',
    contact_no: '09178887777',
  },
  {
    id: "8",
    name: 'Led Zeppelin Tuyay',
    email: 'led_zt@gmail.com',
    contact_no: '09174441234',
  },
  {
    id: "9",
    name: 'Sep Rono',
    email: 'sep_of_typecast@gmail.com',
    contact_no: '09174441234',
  },
]

@Injectable({ providedIn: 'root' })
export class ContactsService {
  private contacts = signal<Contact[]>(this.getInitialContacts());
  allContacts = this.contacts.asReadonly();
  contacts$ = new BehaviorSubject<Contact[]>(this.contacts());


  // function to fetch initial value of contacs array-- localstorage if populated otherwise, the hardcoded sample data
  private getInitialContacts(): Contact[] {
    const savedContacts = localStorage.getItem('contacts');
    return savedContacts
      ? JSON.parse(savedContacts)
      : defaultContacts;
  }

  // function to update local storage
  private updateLocalStorage(contacts: Contact[]): void {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }

  // update the data contacts and observable after add, edit, and delete
  private updateContacts(updatedContacts: Contact[]): void {
    this.contacts.set(updatedContacts);
    this.contacts$.next(updatedContacts);
    this.updateLocalStorage(updatedContacts);
  }

  // function to insert new data to the data array
  addContact(newContact: NewContact): void {
    const randomWholeNumber = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
    const updatedContacts = [
      ...this.contacts(),
      { id: randomWholeNumber.toString(), ...newContact },
    ];
    this.updateContacts(updatedContacts);
  }

  // function to update the selected contact
  editContact(updatedContact: Contact, id: string | number): void {
    const updatedContacts = this.contacts().map((contact) =>
      contact.id === id ? updatedContact : contact
    );
    this.updateContacts(updatedContacts);
  }

  // function to delete the selected contact
  deleteContact(id: string | number): void {
    const updatedContacts = this.contacts().filter(
      (contact) => contact.id !== id
    );
    this.updateContacts(updatedContacts);
  }

  // function to fetch information of selected contact
  getContactInfo(id: string) {
    const info = this.contacts().find((data) => data.id === id);
    return info;
  }

  // function to format contact number from 09123456789 to 0912-345-67-89
  formatContactNumber(value: string|null|undefined) {
    if (!value) return value;
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length !== 11) return value;
    const formatted = `${cleaned.slice(0, 4)}-${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9, 11)}`;
    return formatted;
  }
}
