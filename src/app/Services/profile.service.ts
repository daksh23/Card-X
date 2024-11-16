import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../Model/User.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private httpClient = inject(HttpClient);
  email:any = '';

  constructor() { 
      this.email = this.getEmail();
  }

  retrieveProfile(): Observable<UserModel> {
    console.log("ProfileService :: " + "retrieveProfile method :: ");

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    
    return this.httpClient.post<UserModel>('http://localhost:8081/cardx/rest/v1/user/profile', this.email, httpOptions);
  }


  // retrieve emai from localstorage
  getEmail(){
    let email = localStorage.getItem('email');
    console.log("ProfileService :: " + "getEmail method :: " + email);
    
    return email;
  }
}
