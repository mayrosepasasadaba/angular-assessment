import { Injectable, signal } from '@angular/core';
import { Contact, NewContact } from './contact.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContactsService {
  private contacts = signal<Contact[]>(this.loadContactsFromLocalStorage());
  allContacts = this.contacts.asReadonly();
  contacts$ = new BehaviorSubject<Contact[]>(this.contacts());

  // constructor() {}

  private loadContactsFromLocalStorage(): Contact[] {
    const savedContacts = localStorage.getItem('contacts');
    return savedContacts
      ? JSON.parse(savedContacts)
      : this.getDefaultContacts();
  }

  private getDefaultContacts(): Contact[] {
    return [
      {
        id: "1",
        name: 'Jay Contreras',
        email: 'kamikazeegod@gmail.com',
        contact_no: '09171234567',
      },
      {
        id: 2,
        name: 'Jason Astete',
        email: 'jason_the_menace@gmail.com',
        contact_no: '09206002222',
      },
      {
        id: "2",
        name: 'Mikki Jill',
        email: 'keyboardista@gmail.com',
        contact_no: '09206002222',
      },
      {
        id: "3",
        name: 'Jose Luis Linao',
        email: 'kamikazeeprince@gmail.com',
        contact_no: '09171234456',
      },
      {
        id: "4",
        name: 'Allan Burdeos',
        email: 'allan_burdeos@gmail.com',
        contact_no: '09176666666',
      },
      {
        id: "5",
        name: 'Mark Estacio',
        email: 'mark_estacio@gmail.com',
        contact_no: '09176666666',
      },
      {
        id: "6",
        name: 'Jianelli Lubiano',
        email: 'kamikazeeprincess@gmail.com',
        contact_no: '09178887777',
      },
      {
        id: "7",
        name: 'Led Zeppelin Tuyay',
        email: 'led_zt@gmail.com',
        contact_no: '09174441234',
      },
      {
        id: "8",
        name: 'Sep Rono',
        email: 'sep_of_typecast@gmail.com',
        contact_no: '09174441234',
      },
    ];
  }

  private updateLocalStorage(contacts: Contact[]): void {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }

  private updateContacts(contacts: Contact[]): void {
    this.contacts.set(contacts);
    this.contacts$.next(contacts);
    this.updateLocalStorage(contacts);
  }

  addContact(newContact: NewContact): void {
    const updatedContacts = [
      ...this.contacts(),
      { id: Math.random(), ...newContact },
    ];
    this.updateContacts(updatedContacts);
  }

  editContact(updatedContact: Contact, id: string | number): void {
    const updatedContacts = this.contacts().map((contact) =>
      contact.id === id ? updatedContact : contact
    );
    this.updateContacts(updatedContacts);
  }

  deleteContact(id: string | number): void {
    const updatedContacts = this.contacts().filter(
      (contact) => contact.id !== id
    );
    this.updateContacts(updatedContacts);
  }

  getContactInfo(id: string) {
    const info = this.contacts().find((data) => data.id === id);
    return info;
  }

  formatContactNumber(value: string|null|undefined) {
    if (!value) return value;
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length !== 11) return value;
    const formatted = `${cleaned.slice(0, 4)}-${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9, 11)}`;
    return formatted;
  }
}
