import { Injectable, signal } from "@angular/core";

@Injectable({providedIn: 'root'})
export class ContactsService {
    private contacts = signal([
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
}