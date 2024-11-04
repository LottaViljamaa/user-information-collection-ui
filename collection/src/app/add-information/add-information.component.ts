import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { t } from "../texts.js";
import { environment } from "../../environments/environment.development.js";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-add-information",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: "./add-information.component.html",
  styleUrl: "../app.component.css",
})
export class AddInformationComponent implements OnInit {
  informationForm!: FormGroup;
  t = t;

  message: string = "";

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.informationForm = this.fb.group({
      firstName: [
        "Matti",
        [Validators.required, Validators.pattern("^[a-zA-Z-]+$")],
      ],
      lastName: [
        "Meikalainen",
        [Validators.required, Validators.pattern("^[a-zA-Z-]+$")],
      ],
      personalIdentityCode: [
        "000000-0000",
        [Validators.required, Validators.pattern("^\\d{6}-\\d{4}$")],
      ],
      citizenship: [
        "Suomi",
        [Validators.required, Validators.pattern("^[a-zA-Z]+$")],
      ],
      gender: ["Mies", Validators.required],
      email: [
        "matti.meikalainen@esimerkki.com",
        [Validators.required, Validators.email],
      ],
      phoneNumber: [
        "044123456",
        [
          Validators.required,
          Validators.pattern("^[+]?[0-9]*$"),
          Validators.maxLength(20),
        ],
      ],
      streetAddress: ["Esimerkkikatu", Validators.required],
      city: ["Esimerkki", Validators.required],
      postalCode: [
        "00000",
        [Validators.required, Validators.pattern("^\\d{5}$")],
      ],
    });
  }

  onSubmit(): void {
    if (this.informationForm.valid) {
      const personalIdentityCode = this.informationForm.get(
        "personalIdentityCode",
      )?.value;

      this.http
        .get(`${environment.baseUrl}/get/${personalIdentityCode}`)
        .pipe(
          catchError((err) => {
            if (err.status === 404) {
              return of(null);
            } else {
              this.message = `${t.errorMessages.backendError}`;
              throw err;
            }
          }),
        )
        .subscribe((existingData: any) => {
          if (existingData) {
            this.message = `${t.errorMessages.sendError} ${t.errorMessages.personalIdentityCodeExists}`;
          } else {
            const basicInformation = {
              firstName: this.informationForm.get("firstName")?.value,
              surname: this.informationForm.get("lastName")?.value,
              personalIdentityCode: this.informationForm.get(
                "personalIdentityCode",
              )?.value,
              citizenship: this.informationForm.get("citizenship")?.value,
              gender: this.informationForm.get("gender")?.value,
            };

            const contactInformation = {
              personalIdentityCode: this.informationForm.get(
                "personalIdentityCode",
              )?.value,
              email: this.informationForm.get("email")?.value,
              phoneNumber: this.informationForm.get("phoneNumber")?.value,
              streetAddress: this.informationForm.get("streetAddress")?.value,
              city: this.informationForm.get("city")?.value,
              postalCode: this.informationForm.get("postalCode")?.value,
            };

            const userData = {
              basicInformation: basicInformation,
              contactInformation: contactInformation,
            };

            this.http
              .put(`${environment.baseUrl}/add`, userData)
              .pipe(
                catchError(() => {
                  return of(null);
                }),
              )
              .subscribe(() => {
                alert(`${t.successMessages.success}`);
              });
          }
        });
    }
  }
}
