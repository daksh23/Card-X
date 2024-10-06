import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonutilService } from '../Services/commonutil.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  
  home:string = 'home';

  constructor(private commonutilService:CommonutilService) {
  }

  routeFunc(value:string){
    this.commonutilService.goToPageByUrl(value);
  }
  
  isActive(value:string):boolean {
    return this.commonutilService.isActive(value);
  }
}
