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
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";

@Component({
  selector: "app-show-information",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
  ],
  templateUrl: "./show-information.component.html",
  styleUrls: ["../app.component.css"],
})
export class ShowInformationComponent {
  personalIdentityCode: string = "";
  user: any;
  userData: { label: string; value: any }[] = [];
  errorMessage: string = "";
  t = t;

  showInfoForm: FormGroup;
  displayedColumns: string[] = ["label", "value"];

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
  ) {
    this.showInfoForm = this.fb.group({
      personalIdentityCode: [
        "",
        [Validators.required, Validators.pattern("^\\d{6}")],
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
            this.setUserData();
          } else {
            this.errorMessage = `${t.errorMessages.idNotFound}`;
          }
        });
    } else {
      this.errorMessage = `${t.userInformation.personalIdentityCode} ${t.errorMessages.mandatory}`;
    }
  }

  setUserData() {
    this.userData = [];

    this.userData = [
      {
        label: t.userInformation.firstName,
        value: this.user.basicInformation.firstName,
      },
      {
        label: t.userInformation.lastName,
        value: this.user.basicInformation.surname,
      },
      {
        label: t.userInformation.personalIdentityCode,
        value: this.user.basicInformation.personalIdentityCode,
      },
      {
        label: t.userInformation.citizenship,
        value: this.user.basicInformation.citizenship,
      },
      {
        label: t.userInformation.gender,
        value: this.user.basicInformation.gender,
      },
      {
        label: t.userInformation.email,
        value: this.user.contactInformation.email,
      },
      {
        label: t.userInformation.phoneNumber,
        value: this.user.contactInformation.phoneNumber,
      },
      {
        label: t.userInformation.streetAddress,
        value: this.user.contactInformation.streetAddress,
      },
      {
        label: t.userInformation.city,
        value: this.user.contactInformation.city,
      },
      {
        label: t.userInformation.postalCode,
        value: this.user.contactInformation.postalCode,
      },
    ];
  }
}
