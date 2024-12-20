import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private httpClient:HttpClient) { }

  sendEmail(to:any, subject:string, body:string ) : Observable<string> {
    console.log("Service class :: EmailService :: " + "sendEmail method :: to ::" + to + ":: body:: " + body);

   return this.httpClient.post<string>('http://localhost:8081/cardx/rest/v1/mail/send',
    { 
      to:to, 
      subject:subject, 
      body:body 
    });
  }
}
