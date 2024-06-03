import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonutilService {
  
  constructor(private router:Router) { }

 goToHome(value:string){
    this.router.navigate([`/${value}`]);
 } 

 isActive(value:string):boolean {
  return this.router.url.includes(value);    
}

}
