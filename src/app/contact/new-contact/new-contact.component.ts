import { NgIf } from '@angular/common';
import { Component, EventEmitter, inject, Input, input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Contact } from '../contact.model';
import { ContactsService } from '../contact.service';
import { AlertService } from '../../shared/alert/alert.service';


// return error true if input is
function elevenDigitsOnly(control: AbstractControl) {
  const isValid = /^\d{11}$/.test(control.value)
  if (isValid) {
    return null;
  }
  return { elevenDigitsOnly: true };
}

// returns error true if the input is all white space
function noWhiteSpace(control: AbstractControl) {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { noWhiteSpace: true };
}


@Component({
  selector: 'app-new-contact',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './new-contact.component.html',
  styleUrl: './new-contact.component.css'
})
export class NewContactComponent implements OnInit {
  @Output() close = new EventEmitter();
  @Input({required: true}) action? : string;
  @Input({required: true}) defaultValues! : Contact;

  private contactsService = inject(ContactsService);
  private alertService = inject(AlertService);

  form!: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(this.defaultValues?.name, {
        validators: [Validators.required, noWhiteSpace]
      }),
      email: new FormControl(this.defaultValues?.email, {
        validators: [Validators.required, Validators.email]
      }),
      contact_no: new FormControl(this.defaultValues?.contact_no, {
        validators: [Validators.required, elevenDigitsOnly]
      }),
    })
  }

  onContactNoInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, ''); // Remove any non-digit characters
    if (input.value.length > 11) {
      input.value = input.value.slice(0, 11); // Keep only the first 11 digits
    }
    this.form.get('contact_no')?.setValue(input.value, { emitEvent: false });
  }

  // generic validity checker
  get isInvalid() {
    return (field: string) => {
      const control = this.form.controls[field as keyof typeof this.form.controls];
      return control && control.touched && control.dirty && control.invalid;
    };
  }

  getErrorMessage(field: string, label: string) {
    const control = this.form.controls[field as keyof typeof this.form.controls];
    if ((control?.hasError('required')||control?.hasError('noWhiteSpace')||control?.hasError('elevenDigitsOnly')) && control.touched) {
      return `Please enter ${label}`;
    }
    if (control?.hasError(field) && control.touched) {
      return `Please enter a valid ${label}`;
    }

    return null;
  }

  onCancel() {
    this.form.reset();
    this.close.emit();
  }

  onAddContact() {
    this.contactsService.addContact(this.form.value).subscribe({
      next: (response: Contact) => {
        this.alertService.showAlert("Successfully added a new contact!", "success");
        this.contactsService.fetchAllContacts();
      },
      complete: () => {
        this.form.reset();
        this.close.emit();
      },
      error: (error) => {
        this.alertService.showAlert("Error adding a new contact", "error");
      }
    });
  }

  onSaveChanges() {
    this.contactsService.editContact(this.form.value, this.defaultValues.id).subscribe({
      next: (response: Contact) => {
        this.alertService.showAlert("Changes saved", "success");
        this.contactsService.fetchAllContacts();
        console.log("here")
      },
      complete: () => {
        this.form.reset();
        this.close.emit();
      },
      error: (error) => {
        this.alertService.showAlert("Error updating contact", "error");
      }
    });
    
  }
}
