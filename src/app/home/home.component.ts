import { Component, EventEmitter, Output, signal } from '@angular/core';
import { ContactComponent } from "../contact/contact.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ContactComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  openAddContact = false;
  
  onOpenAddContact() {
    this.openAddContact=true;
  }
}
