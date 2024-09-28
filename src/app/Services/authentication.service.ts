import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  private httpClient = inject(HttpClient);

  loginAuth(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email, password };

    return this.httpClient.post<any>("http://localhost:8080/cardx/rest/v1/user/login", body, { headers }).pipe(map(response => {
          console.log("loginAuth method :: " + "login token response :: " + response);
          return response;
        })
      );
  }

  // Method to log out the user
  logout(): void {
    // Remove token from localStorage or sessionStorage
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('email');
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwtToken');
  }

  // Get the token
  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

}
