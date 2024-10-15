import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-contact',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './new-contact.component.html',
  styleUrl: './new-contact.component.css'
})
export class NewContactComponent {
  @Output() close = new EventEmitter()

  form = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required]
    }),
    email: new FormControl('', {
      validators: [Validators.email, Validators.required]
    }),
    contact_no: new FormControl('', {
      validators: [Validators.required]
    }),
  })

  // generic validity checker
  get isInvalid() {
    return (field: string) => {
      const control =
        this.form.controls[field as keyof typeof this.form.controls];
      return control && control.touched && control.dirty && control.invalid;
    };
  }

  onCancel() {
    this.close.emit();
  }

  onSubmit() {
    console.log(this.form)
  }
}
