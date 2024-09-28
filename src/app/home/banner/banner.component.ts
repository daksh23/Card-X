import { Component, inject } from '@angular/core';
import { CommonutilService } from '../../Services/commonutil.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {

  commonutilService:CommonutilService = inject(CommonutilService);
  register:string = 'register';
  order:string = 'order';

   routeFunc(value:string){
    this.commonutilService.goToPageByUrl(value);
  }
  
  isActive(value:string):boolean {
    return this.commonutilService.isActive(value);
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return this.commonutilService.isLoggedIn();
  }
  
}
