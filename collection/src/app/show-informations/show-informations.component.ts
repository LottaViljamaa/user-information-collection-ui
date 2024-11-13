import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, of } from "rxjs";
import { CommonModule } from "@angular/common";
import { t } from "../shared/texts.js";
import { environment } from "../../environments/environment.development.js";

@Component({
  selector: "app-show-informations",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./show-informations.component.html",
  styleUrl: "../app.component.css",
})
export class ShowInformationsComponent implements OnInit {
  users: any[] = [];
  t = t;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.http
      .get<any[]>(`${environment.baseUrl}/all`)
      .pipe(
        catchError((error) => {
          alert(`${t.errorMessages.backendError}`);
          return of([]);
        }),
      )
      .subscribe((data) => {
        this.users = data;
      });
  }
}
