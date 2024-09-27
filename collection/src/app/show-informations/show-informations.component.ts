import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-informations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-informations.component.html',
  styleUrl: '../app.component.css'
})
export class ShowInformationsComponent implements OnInit {
  users: any[] = [];
  private apiUrl = 'http://localhost:8090/users/all';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchUsers();
  }


  fetchUsers(): void {
    this.http.get<any[]>(this.apiUrl)
      .pipe(
        catchError(error => {
          console.error('Virhe käyttäjätietojen haussa:', error); 
          alert('Tietojen haussa tapahtui virhe.');
          return of([]);
        })
      )
      .subscribe(data => {
        console.log('Käyttäjätiedot:', data);
        this.users = data;
      });
  }
  
}
