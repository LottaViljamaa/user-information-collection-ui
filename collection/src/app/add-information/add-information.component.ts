import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-information',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-information.component.html',
  styleUrl: './add-information.component.css'
})
export class AddInformationComponent implements OnInit {
  informationForm!: FormGroup; 

  private apiUrl = 'http://localhost:8090/users/add';

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.informationForm = this.fb.group({
      firstName: ['Matti', [Validators.required, Validators.pattern('^[a-zA-Z-]+$')]],
      lastName: ['Meikalainen', [Validators.required, Validators.pattern('^[a-zA-Z-]+$')]],
      personalIdentityCode: ['000000-0000', [Validators.required, Validators.pattern('^\\d{6}-\\d{4}$')]],
      citizenship: ['Suomi', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      gender: ['Mies', Validators.required],
      email: ['matti.meikalainen@esimerkki.com', [Validators.required, Validators.email]],
      phoneNumber: ['044123456', [Validators.required, Validators.pattern('^[+]?[0-9]*$'), Validators.maxLength(20)]],
      streetAddress: ['Esimerkkikatu', Validators.required],
      city: ['Esimerkki', Validators.required],
      postalCode: ['00000', [Validators.required, Validators.pattern('^\\d{5}$')]]
    });
  }

  onSubmit(): void {
    if (this.informationForm.valid) {
      const basicInformation = {
        firstName: this.informationForm.get('firstName')?.value,
        surname: this.informationForm.get('lastName')?.value,
        personalIdentityCode: this.informationForm.get('personalIdentityCode')?.value,
        citizenship: this.informationForm.get('citizenship')?.value,
        gender: this.informationForm.get('gender')?.value
      };

      const contactInformation = {
        personalIdentityCode: this.informationForm.get('personalIdentityCode')?.value,
        email: this.informationForm.get('email')?.value,
        phoneNumber: this.informationForm.get('phoneNumber')?.value,
        streetAddress: this.informationForm.get('streetAddress')?.value,
        city: this.informationForm.get('city')?.value,
        postalCode: this.informationForm.get('postalCode')?.value
      };

      const userData = {
        basicInformation: basicInformation,
        contactInformation: contactInformation
      };

      this.http.put(this.apiUrl, userData)
      .subscribe(() => {
        console.log('Tietojen lähetys onnistui.');
      });
    }
  }
}