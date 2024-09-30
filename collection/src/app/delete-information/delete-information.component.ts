import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {t} from '../texts'
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-delete-information',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './delete-information.component.html',
  styleUrl: '../app.component.css'
})
export class DeleteInformationComponent {

  personalIdentityCodeToDelete: string = '';
  user: any;
  message: string = '';
  t = t;

  constructor(private http: HttpClient) {}

  onDelete() {
    this.user = null;
    this.message = '';

    if (this.personalIdentityCodeToDelete) {
      this.http.get(`${environment.baseUrl}/get/${this.personalIdentityCodeToDelete}`)
      .pipe(
        catchError(err => {
          this.message = `${t.errorMessages.noInformationFound}`;
          return of(null);
        })
      )
        .subscribe((data: any) => {
          if (data) {
            const confirmDelete = confirm(`${t.confirmationMessage.delete.replace('{id}', this.personalIdentityCodeToDelete)}`);

            if (confirmDelete) {
              this.http.delete(`${environment.baseUrl}/delete/${this.personalIdentityCodeToDelete}`)
                .pipe(
                  catchError(err => {
                    this.message = `${t.errorMessages.deleteError}`;
                    return of(null);
                  })
                )
                .subscribe(() => {
                  this.message = `${t.successMessages.deleteSuccess.replace('{id}', this.personalIdentityCodeToDelete)}`;
                  this.personalIdentityCodeToDelete = ''; 
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

}