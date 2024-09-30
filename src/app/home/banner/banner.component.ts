import { Component, inject } from '@angular/core';
import { CommonutilService } from '../../Services/commonutil.service';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {

  register:string = 'register';
  order:string = 'order';
  private commonutilService:CommonutilService = inject(CommonutilService);
  private authenticationService:AuthenticationService = inject(AuthenticationService);

   routeFunc(value:string){
    this.commonutilService.goToPageByUrl(value);
  }
  
  isActive(value:string):boolean {
    return this.commonutilService.isActive(value);
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
  
}
