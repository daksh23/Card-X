import { Component } from '@angular/core';
import { CommonutilService } from '../Services/commonutil.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent {

  constructor( private commonutilService:CommonutilService) {}

  
  goToHome(){
    this.commonutilService.goToPageByUrl("home");
  }
  
  isActive(){
    this.commonutilService.isActive("home");
  }

  buy(){
    console.log("Buy ...");
  }
}
