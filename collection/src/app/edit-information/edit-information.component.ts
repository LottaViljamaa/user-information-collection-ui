import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule, } from '@angular/forms';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-edit-information',
  standalone: true,
  imports: [FormsModule, CommonModule,ReactiveFormsModule],
  templateUrl: './edit-information.component.html',
  styleUrl: '../app.component.css'
})
export class EditInformationComponent {
  searchForm: FormGroup;
  informationForm!: FormGroup;
  user: any;
  errorMessage: string = '';
  showForm: boolean = false;

  private apiUrlGet = 'http://localhost:8090/users/get';
  private apiUrlUpdate = 'http://localhost:8090/users/update';

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      personalIdentityCode: ['', [Validators.required, Validators.pattern('^\\d{6}-\\d{4}$')]]
    });
  }

  onSearch(): void {
    const personalIdentityCode = this.searchForm.get('personalIdentityCode')?.value;

    if (this.searchForm.valid) {
      this.http.get(`${this.apiUrlGet}/${personalIdentityCode}`).pipe(
        catchError(err => {
          if (err.status === 404) {
            this.errorMessage = 'Annetulla henkilötunnuksella ei löydy tietoja.';
            this.showForm = false;
            return of(null);
          } else {
            throw err;
          }
        })
      ).subscribe((data: any) => {
        if (data) {
          this.user = data;
          this.initializeForm();
          this.showForm = true;
          this.errorMessage = '';
        }
      });
    }
  }

  initializeForm(): void {
    this.informationForm = this.fb.group({
      firstName: [this.user.basicInformation.firstName, [Validators.required, Validators.pattern('^[a-zA-Z-]+$')]],
      lastName: [this.user.basicInformation.surname, [Validators.required, Validators.pattern('^[a-zA-Z-]+$')]],
      personalIdentityCode: [{ value: this.user.basicInformation.personalIdentityCode, disabled: true }],
      citizenship: [this.user.basicInformation.citizenship, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      gender: [this.user.basicInformation.gender, Validators.required],
      email: [this.user.contactInformation.email, [Validators.required, Validators.email]],
      phoneNumber: [this.user.contactInformation.phoneNumber, [Validators.required, Validators.pattern('^[+]?[0-9]*$'), Validators.maxLength(20)]],
      streetAddress: [this.user.contactInformation.streetAddress, Validators.required],
      city: [this.user.contactInformation.city, Validators.required],
      postalCode: [this.user.contactInformation.postalCode, [Validators.required, Validators.pattern('^\\d{5}$')]]
    });
  }
  onSubmit(): void {
    if (this.informationForm.valid) {
      const personalIdentityCode = this.informationForm.get('personalIdentityCode')?.value;

      const updateUrl = `${this.apiUrlUpdate}/${personalIdentityCode}`;

      const userData = {
        basicInformation: {
          firstName: this.informationForm.get('firstName')?.value,
          surname: this.informationForm.get('lastName')?.value,
          personalIdentityCode: this.informationForm.get('personalIdentityCode')?.value,
          citizenship: this.informationForm.get('citizenship')?.value,
          gender: this.informationForm.get('gender')?.value
        },
        contactInformation: {
          personalIdentityCode: this.informationForm.get('personalIdentityCode')?.value,
          email: this.informationForm.get('email')?.value,
          phoneNumber: this.informationForm.get('phoneNumber')?.value,
          streetAddress: this.informationForm.get('streetAddress')?.value,
          city: this.informationForm.get('city')?.value,
          postalCode: this.informationForm.get('postalCode')?.value
        }
      };

      this.http.put(updateUrl, userData)
        .pipe(catchError(err => {
          this.errorMessage = 'Tietojen päivitys epäonnistui.';
          return of(null);
        }))
        .subscribe(() => {
          alert('Tietojen päivitys onnistui.');
          this.showForm = false;
        });
    }
  }
}
