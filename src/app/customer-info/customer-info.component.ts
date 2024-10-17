import { Component, computed, inject, input } from '@angular/core';
import { ContactsService } from '../contact/contact.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-customer-info',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './customer-info.component.html',
  styleUrl: './customer-info.component.css'
})
export class CustomerInfoComponent {
  private contactsService = inject(ContactsService);
  contactId = input.required<string>();
  userInfo = computed(() => this.contactsService.getContactInfo(this.contactId()))
}
