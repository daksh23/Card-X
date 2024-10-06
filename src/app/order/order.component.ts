import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardDesignModel } from '../Model/CardDesign.model';
import { CommonutilService } from '../Services/commonutil.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public getCard?:CardDesignModel;
  private commonutilService:CommonutilService = inject(CommonutilService);
  public design:string = 'card-designs';
  public ai:string = 'ai';

  isCameDirectly:boolean = true;
  public designTypeCond:string = '';
  totalDesignType:any = ['standard','advanced','premium'];


  constructor(){ }

  ngOnInit(): void {
    this.getCard = history.state.card; // Get selected cardDetails 
    
    if(this.getCard !== undefined)
    {
      console.log("Order page :: Data got from design page :: " + this.commonutilService.printObjectValues(this.getCard));
      this.isCameDirectly = false;
      this.designTypeCond = this.getCard.designType;
    }else{
      console.log("Order page :: Data got from design page :: " + this.getCard + " is Came directly using URL :: invalid way :: ");
    }     
  }

  routeFunc(value:string){
    if(value === 'ai')
      console.log("Component OrderComponent :: " + "Route method with value :: " + value);
    else
      this.commonutilService.goToPageByUrl(value);
  }
  
  isActive(value:string):boolean {
    return this.commonutilService.isActive(value);
  }  
}
