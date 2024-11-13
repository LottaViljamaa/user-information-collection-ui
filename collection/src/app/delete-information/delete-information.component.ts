import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";
import { t } from "../shared/texts";
import { environment } from "../../environments/environment.development";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ButtonComponent } from "../shared/button/button.component";
import { InputComponent } from "../shared/input/input.component";

@Component({
  selector: "app-delete-information",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ButtonComponent,
    InputComponent,
  ],
  templateUrl: "./delete-information.component.html",
  styleUrls: ["../app.component.css"],
})
export class DeleteInformationComponent {
  deleteForm: FormGroup;
  message: string = "";
  t = t;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
  ) {
    this.deleteForm = this.fb.group({
      personalIdentityCode: [
        "",
        [Validators.required, Validators.pattern("^\\d{6}")],
      ],
    });
  }

  onDelete() {
    this.message = "";
    const personalIdentityCode = this.deleteForm.get(
      "personalIdentityCode",
    )?.value;

    if (this.deleteForm.valid) {
      this.http
        .get(`${environment.baseUrl}/get/${personalIdentityCode}`)
        .pipe(
          catchError((err) => {
            if (err.status === 404) {
              this.message = `${t.userInformation.personalIdentityCode}${t.errorMessages.idNotFound}`;
              return of(null);
            }
            this.message = `${t.errorMessages.backendError}`;
            return of(null);
          }),
        )
        .subscribe((data: any) => {
          if (data) {
            const confirmDelete = confirm(
              `${t.confirmationMessage.delete.replace("{id}", personalIdentityCode)}`,
            );

            if (confirmDelete) {
              this.http
                .delete(`${environment.baseUrl}/delete/${personalIdentityCode}`)
                .pipe(
                  catchError((err) => {
                    this.message = `${t.errorMessages.deleteError}`;
                    return of(null);
                  }),
                )
                .subscribe(() => {
                  alert(
                    `${t.successMessages.deleteSuccess.replace("{id}", personalIdentityCode)}`,
                  );
                  this.deleteForm.reset();
                });
            } else {
              this.message = `${t.cancelMessages.cancel}`;
            }
          }
        });
    } else {
      this.message = `${t.userInformation.personalIdentityCode}${t.errorMessages.mandatory}`;
    }
  }

  isIdentityCodeValid() {
    return this.deleteForm.get("personalIdentityCode")?.valid;
  }
}
