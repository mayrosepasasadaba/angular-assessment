import { Injectable, signal } from "@angular/core";

@Injectable({providedIn: 'root'})
export class ContactsService {
    private contacts = signal([
        {
          id: 1,
          name: 'Jay Contreras',
          email: 'kamikazeegod@gmail.com',
          contact_no: '0917-123-4567'
        },
        {
          id: 2,
          name: 'Jason Astete',
          email: 'jason_the_menace@gmail.com',
          contact_no: '0920-600-22-22'
        },
        {
          id: 3,
          name: 'Mikki Jill',
          email: 'keyboardista@gmail.com',
          contact_no: '0920-600-22-22'
        },
        {
          id: 4,
          name: 'Jose Luis Linao',
          email: 'kamikazeeprince@gmail.com',
          contact_no: '0917-123-44-56'
        },
        {
          id: 5,
          name: 'Allan Burdeos',
          email: 'allan_burdeos@gmail.com',
          contact_no: '0917-666-66-66'
        },
        {
          id: 6,
          name: 'Mark Estacio',
          email: 'mark_estacio@gmail.com',
          contact_no: '0917-666-66-66'
        },
        {
          id: 7,
          name: 'Jianelli Lubiano',
          email: 'kamikazeeprincess@gmail.com',
          contact_no: '0917-888-77-77'
        },
        {
          id: 8,
          name: 'Led Zeppelin Tuyay',
          email: 'led_zt@gmail.com',
          contact_no: '0917-444-12-34'
        },
        {
          id: 9,
          name: 'Sep Rono',
          email: 'sep_of_typecast@gmail.com',
          contact_no: '0917-444-12-34'
        }
      ])

      allContacts = this.contacts.asReadonly();
}