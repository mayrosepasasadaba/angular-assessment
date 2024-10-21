import { inject, Injectable, signal } from '@angular/core';
import { Contact, NewContact } from './contact.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ContactsService {
  private contacts = signal<Contact[]>([]);
  allContacts = this.contacts.asReadonly();
  contacts$ = new BehaviorSubject<Contact[]>(this.contacts());
  private http = inject(HttpClient);

  private apiUrl = "http://localhost:3000/contacts"


  getAllContacts() {
    return this.http.get<Contact[]>(this.apiUrl).pipe(
      tap({
        next: (allContacts) => {
          this.contacts.set(allContacts);
          this.contacts$.next(allContacts);
        }
      })
    );
  }

  // Method to insert new data to the data array
  addContact(newContact: NewContact) {
    const randomWholeNumber = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
    const newData = {
      id: randomWholeNumber.toString(),
      ...newContact
    }
    return this.http.post<Contact>(this.apiUrl, newData);
  }

  // Method to edit an existing contact
  editContact(updatedContact: Contact, contactId: string|number): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/${contactId}`, updatedContact);
  }

  // Method to delete the selected contact
  deleteContact(contactId: string | number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${contactId}`);
  }


  // function to fetch information of selected contact
  getContactInfo(contactId: string | number): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/${contactId}`);
  }

  // function to format contact number from 09123456789 to 0912-345-67-89
  formatContactNumber(value: string|null|undefined) {
    if (!value) return value;
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length !== 11) return value;
    const formatted = `${cleaned.slice(0, 4)}-${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9, 11)}`;
    return formatted;
  }

  fetchAllContacts(): void {
    this.getAllContacts().subscribe({
      next: (allContacts) => {
        // console.log('Contacts fetched:', allContacts);
      },
      error: (error) => {
        console.error('Error fetching contacts:', error);
      }
    });
  }
}
