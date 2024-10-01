import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { t } from '../texts.js';
import { environment } from '../../environments/environment.development.js';

@Component({
  selector: 'app-show-information',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './show-information.component.html',
  styleUrl: '../app.component.css',
})
export class ShowInformationComponent {
  personalIdentityCode: string = '';
  user: any;
  errorMessage: string = '';
  t = t;

  constructor(private http: HttpClient) {}

  onSearch() {
    this.user = null;
    this.errorMessage = '';

    if (this.personalIdentityCode) {
      this.http
        .get(`${environment.baseUrl}/get/${this.personalIdentityCode}`)
        .pipe(
          catchError((err) => {
            this.errorMessage = `${t.errorMessages.idNotFound}`;
            return of(null);
          }),
        )
        .subscribe((data: any) => {
          if (data) {
            this.user = data;
          }
        });
    } else {
      this.errorMessage = `${t.userInformation.personalIdentityCode} ${t.errorMessages.mandatory}`;
    }
  }
}
