import { Component, inject } from '@angular/core';
import { CommonutilService } from '../../Services/commonutil.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {

  commonutilService:CommonutilService = inject(CommonutilService);

  goToRegister() {
    this.commonutilService.goToPageByUrl('register');
  }

  isActive(){
    this.commonutilService.isActive('register');
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return this.commonutilService.isLoggedIn();
  }
  
}
