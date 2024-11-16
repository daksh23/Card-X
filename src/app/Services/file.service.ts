import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
  
    // need to change endpoint here
    return this.http.post('http://localhost:8081/cardx/rest/v1/card/upload', formData);
  }

}
