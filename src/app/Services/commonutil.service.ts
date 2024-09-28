import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseModal } from '../Model/Response.modal';

@Injectable({
  providedIn: 'root',
})
export class CommonutilService {
  constructor(private router: Router) {}

  goToPageByUrl(value: string) {
    this.router.navigate([`/${value}`]);
  }

  isActive(value: string): boolean {
    return this.router.url.includes(value);
  }

  // Print any object in console log
  printObjectValues(obj: any): string {
    return JSON.stringify(obj, null, 2);
  }


  mapResponse(jsonString: string): ResponseModal {
    // Correct JSON string format (if needed)
    const correctedJsonString = jsonString.replace(/'/g, '"');
  
    // Parse the JSON string
    const parsedJson = JSON.parse(correctedJsonString);
  
    // Map the parsed JSON to the ResponseModal interface
    const response: ResponseModal = {
      complete: parsedJson.Complete,
      error: parsedJson.Error // Ensure 'Error' key exists in JSON
    };
  
    return response;
  }
}
