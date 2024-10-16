import { Injectable, signal } from "@angular/core";
import { Contact, NewContact } from "./contact.model";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn: 'root'})
export class ContactsService {

    private contacts = signal<Contact[]>([
        {
          id: 1,
          name: 'Jay Contreras',
          email: 'kamikazeegod@gmail.com',
          contact_no: '09171234567'
        },
        {
          id: 2,
          name: 'Jason Astete',
          email: 'jason_the_menace@gmail.com',
          contact_no: '09206002222'
        },
        {
          id: 3,
          name: 'Mikki Jill',
          email: 'keyboardista@gmail.com',
          contact_no: '09206002222'
        },
        {
          id: 4,
          name: 'Jose Luis Linao',
          email: 'kamikazeeprince@gmail.com',
          contact_no: '09171234456'
        },
        {
          id: 5,
          name: 'Allan Burdeos',
          email: 'allan_burdeos@gmail.com',
          contact_no: '09176666666'
        },
        {
          id: 6,
          name: 'Mark Estacio',
          email: 'mark_estacio@gmail.com',
          contact_no: '09176666666'
        },
        {
          id: 7,
          name: 'Jianelli Lubiano',
          email: 'kamikazeeprincess@gmail.com',
          contact_no: '09178887777'
        },
        {
          id: 8,
          name: 'Led Zeppelin Tuyay',
          email: 'led_zt@gmail.com',
          contact_no: '09174441234'
        },
        {
          id: 9,
          name: 'Sep Rono',
          email: 'sep_of_typecast@gmail.com',
          contact_no: '09174441234'
        }
      ])
      allContacts = this.contacts.asReadonly();

      contacts$ = new BehaviorSubject<Contact[]>([]);

    constructor() {
      const tempContacts = localStorage.getItem('contacts')

      if (tempContacts) {
        this.contacts.set(JSON.parse(tempContacts))
      }
    } 

    getAllContacts() {
      return this.contacts();
    }

    addTask(info: NewContact) {
      const tempData = [...this.contacts()]
      tempData.push({
        id: Math.random(),
        ...info
      })

      this.contacts.set(tempData);
      this.contacts$.next(this.contacts());
      localStorage.setItem('contacts', JSON.stringify(tempData))
    }

    editTask(info: Contact, id: string|number) {
      const tempData = [...this.contacts()]
      const index = tempData.findIndex(contact => contact.id === id)
      tempData[index] = info;
      
      this.contacts.set(tempData);
      this.contacts$.next(this.contacts());
      localStorage.setItem('contacts', JSON.stringify(tempData))
    }

    deleteTask(id: string|number) {
      const tempData = [...this.contacts()]
      const newData = tempData.filter((data) => data.id !== id)

      this.contacts.set(tempData);
      this.contacts$.next(this.contacts());
      localStorage.setItem('contacts', JSON.stringify(newData))
    }

    updateLocalStorage() {

    }
      
}