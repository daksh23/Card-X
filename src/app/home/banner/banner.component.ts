import { Component, inject } from '@angular/core';
import { CommonutilService } from '../../Services/commonutil.service';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {

  private commonutilService:CommonutilService = inject(CommonutilService);
  private authenticationService:AuthenticationService = inject(AuthenticationService);

  goToRegister() {
    this.commonutilService.goToPageByUrl('register');
  }

  isActive(){
    this.commonutilService.isActive('register');
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
  
}
