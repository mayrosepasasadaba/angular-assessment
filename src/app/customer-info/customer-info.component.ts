import { Component, computed, DestroyRef, inject, input, signal } from '@angular/core';
import { ContactsService } from '../contact/contact.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Contact } from '../contact/contact.model';

@Component({
  selector: 'app-customer-info',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './customer-info.component.html',
  styleUrl: './customer-info.component.css'
})
export class CustomerInfoComponent {
  private contactsService = inject(ContactsService);
  destroyRef = inject(DestroyRef);
  contactId = input.required<string>();
  userInfo = signal<Contact>({
    id: '',
    name: '',
    email: '',
    contact_no: '',
  })
  
  ngOnInit() {
    const subscription = this.contactsService.getContactInfo(this.contactId()).subscribe({
      next: (response) => {
        this.userInfo.set(response)
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

  formatContactNumber(value: string|null|undefined) {
    return this.contactsService.formatContactNumber(value)
  }
}
