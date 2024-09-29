import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import {t} from '../texts.js'

@Component({
  selector: 'app-show-informations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-informations.component.html',
  styleUrl: '../app.component.css'
})
export class ShowInformationsComponent implements OnInit {
  users: any[] = [];
  t=t;
  private apiUrl = 'http://localhost:8090/users/all';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchUsers();
  }


  fetchUsers(): void {
    this.http.get<any[]>(this.apiUrl)
      .pipe(
        catchError(error => {
          alert(`${t.errorMessages.searchErro}`);
          return of([]);
        })
      )
      .subscribe(data => {
        this.users = data;
      });
  }
  
}
