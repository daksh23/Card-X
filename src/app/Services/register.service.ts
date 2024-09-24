import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SocialMediaModal } from '../Model/SocialMedia.modal';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor() { }

  private httpClient = inject(HttpClient);

  /// make api call to register userDetails in database
  sendUserData(registerDetails:String): Observable<string> {
    console.log("RegisterService :: " + "sendUserData method :: ");
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json' // explicitly cast to 'json' to 'text'
    };
    
    return this.httpClient.post<string>('http://localhost:8080/cardx/rest/v1/user/add', registerDetails, httpOptions);
  }


  
  // map form data with modal
  transformData(data: any): any {
    const transformedData: any = {
      personalInfo: {
        ...data.personalInfo
      }, 
      socialMedia:{
        ...data.socialMedia
      },    
      education: [],
      experience: []
    };

    // Transform education
    for (const key in data.education) {
      if (data.education.hasOwnProperty(key)) {
        transformedData.education.push(data.education[key]);
      }
    }

    // Transform experience
    for (const key in data.experience) {
      if (data.experience.hasOwnProperty(key)) {
        transformedData.experience.push(data.experience[key]);
      }
    }

    return transformedData;
  }

  changePassword(currentPassword:string, newPassword:string, confirmPassword:string, email:string | null): Observable<any> {
    const headers = new HttpHeaders(
      { 
        'Content-Type': 'application/json',  
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials' : 'true',
        'Access-Control-Max-Age': '1800',
      });

    const body = { currentPassword, newPassword, confirmPassword, email };
    
    return this.httpClient.post<any>("http://localhost:8080/cardx/rest/v1/user/changePassword", body, { headers }).pipe(map(response => {
      console.log("changePassword method :: " + "changePassword  Response:: " + response);
      return response;
    })
  );
  }

}
