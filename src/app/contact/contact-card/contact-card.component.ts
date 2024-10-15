import { Component, input } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-card',
  standalone: true,
  imports: [],
  templateUrl: './contact-card.component.html',
  styleUrl: './contact-card.component.css'
})
export class ContactCardComponent {
  contactInfo = input.required<Contact>()
}
