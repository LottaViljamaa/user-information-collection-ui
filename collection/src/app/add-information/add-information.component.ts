import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-information',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-information.component.html',
  styleUrl: './add-information.component.css'
})
export class AddInformationComponent implements OnInit {
  informationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Lomake, jossa vain yksi kenttä
    this.informationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z-]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z-]+$')]],
      personallIdentityCode: ['', [Validators.required, Validators.pattern('^\\d{6}-\\d{4}$')]],
      citizenship: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[+]?[0-9]*$'), Validators.maxLength(20)]],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern('^\\d{5}$')]],
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.informationForm.valid) {
      console.log('Form Submitted', this.informationForm.value);
    }
  }
}
