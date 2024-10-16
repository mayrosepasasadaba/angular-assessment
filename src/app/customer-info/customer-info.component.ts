import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Contact } from '../contact/contact.model';
import { ContactsService } from '../contact/contact.service';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-customer-info',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './customer-info.component.html',
  styleUrl: './customer-info.component.css'
})
export class CustomerInfoComponent implements OnInit {
  private contactsService = inject(ContactsService);
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    
  }
  userInfo = signal<Contact>({
    id: '',
    name: '',
    email: '',
    contact_no: '',
  })

  // ngOnInit(): void {
  //   console.log(this.contactId())
  //   if (this.contactId()) {
  //     const tempInfo = this.contactsService.getContactInfo(this.contactId())
  //     console.log(tempInfo)
  //     this.userInfo.set(tempInfo||{
  //       id: '',
  //       name: '',
  //       email: '',
  //       contact_no: '',
  //     })
  //   }
  // }

  ngOnInit(): void {
    const subscription = this.route.paramMap.subscribe({
      next: (paramMap) => (
        console.log(paramMap)
        // this.userName = this.usersService.users.find((user) => user.id === paramMap.get('userId'))?.name || ''
      )
    })

    // this.destroyRef.onDestroy(() => {
    //   subscription.unsubscribe();
    // })
  }

}
