import { Component, inject } from '@angular/core';
import { CardDesignModel } from '../Model/CardDesign.model';
import { CardDesignService } from '../Services/card-design.service';
import { CommonutilService } from '../Services/commonutil.service';
import { AuthenticationService } from '../Services/authentication.service';

@Component({
  selector: 'app-designs',
  templateUrl: './designs.component.html',
  styleUrls: ['./designs.component.scss']
})
export class DesignsComponent {

  cards:CardDesignModel[] = [];
  allTimeCards:CardDesignModel[] = [];
  
  private cardDesignService:CardDesignService = inject(CardDesignService);
  private commonutilService:CommonutilService = inject(CommonutilService);

  private authenticationService:AuthenticationService = inject(AuthenticationService);

  ngOnInit(): void {
    this.getTheCardDesigns();
  }

  getTheCardDesigns() {
    console.log("CardDesignComponent  :: " + "getTheCardDesigns method :: ");

    this.cardDesignService.retrieveCardDesigns().subscribe(data => {
      this.cards = data.filter(x => x.collection === "weekly");
      this.allTimeCards = data.filter(x => x.collection === "all-time");
    });
  }

  routeFunc(value:string){
    this.commonutilService.goToPageByUrl(value);
  }
  
  isActive(value:string):boolean {
    return this.commonutilService.isActive(value);
  }
  
  isLoggedIn(){
    return this.authenticationService.isLoggedIn();
  }

  test(value:any){
    console.log("card button Testing ...!" + value);
  }
}
