import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonutilService } from '../Services/commonutil.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  features:string = 'features';
  cardDesign:string = 'card-designs';
  pricing:string = 'pricing';
  help:string = 'help';
  home:string = 'home';
  login:string = "login";
  register:string = "register";

  router:Router = inject(Router);

  CommonutilService:CommonutilService = inject(CommonutilService);

  routeFunc(value:string){
    this.CommonutilService.goToPageByUrl(value);
  }
  
  isActive(value:string):boolean {
    return this.CommonutilService.isActive(value);
  }
}
