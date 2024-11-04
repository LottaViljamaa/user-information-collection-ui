import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { t } from "../texts";
import { environment } from "../../environments/environment.development";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";

@Component({
  selector: "app-show-information",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: "./show-information.component.html",
  styleUrls: ["../app.component.css"],
})
export class ShowInformationComponent {
  personalIdentityCode: string = "";
  user: any;
  errorMessage: string = "";
  t = t;

  showInfoForm: FormGroup;
  displayedColumns: string[] = [
    "firstName",
    "lastName",
    "personalIdentityCode",
    "citizenship",
    "gender",
    "email",
    "phoneNumber",
    "streetAddress",
    "city",
    "postalCode",
  ];

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
  ) {
    this.showInfoForm = this.fb.group({
      personalIdentityCode: [
        "",
        [
          Validators.required,
          Validators.pattern(/^\d{6}[A-Z0-9+-]\d{3}[A-Z0-9]$/),
        ],
      ],
    });

    this.showInfoForm.valueChanges.subscribe(() => {
      this.errorMessage = "";
    });
  }

  onSearch() {
    this.user = null;
    this.errorMessage = "";

    if (this.showInfoForm.valid) {
      this.personalIdentityCode = this.showInfoForm.value.personalIdentityCode;

      this.http
        .get(`${environment.baseUrl}/get/${this.personalIdentityCode}`)
        .pipe(
          catchError((err) => {
            if (err.status === 404) {
              this.errorMessage = `${t.errorMessages.idNotFound}`;
            } else {
              this.errorMessage = `${t.errorMessages.backendError}`;
              throw err;
            }
            return of(null);
          }),
        )
        .subscribe((data: any) => {
          if (data) {
            this.user = data;
          } else {
            this.errorMessage = `${t.errorMessages.idNotFound}`;
          }
        });
    } else {
      this.errorMessage = `${t.userInformation.personalIdentityCode} ${t.errorMessages.mandatory}`;
    }
  }
}
