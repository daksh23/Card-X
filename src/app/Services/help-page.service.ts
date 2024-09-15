import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HelpPageModal } from '../Model/HelpPage.modal';

@Injectable({
  providedIn: 'root'
})
export class HelpPageService {

  constructor() { }

  private httpClient = inject(HttpClient);
  features:HelpPageModal[] = [];

  sendHelpPageData(helpPageModal:HelpPageModal): Observable<string> {
    console.log("HelpPageService :: " + "sendHelpPageData method :: ");
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json' // explicitly cast to 'json' to 'text'
    };
    
    return this.httpClient.post<string>('http://localhost:8080/cardx/rest/v1/card/help/add', helpPageModal, httpOptions);
  }

}
