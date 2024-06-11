import { Component, inject } from '@angular/core';
import { CardDesignModel } from '../Model/CardDesign.model';
import { CardDesignService } from '../Services/card-design.service';
import { CommonutilService } from '../Services/commonutil.service';

@Component({
  selector: 'app-designs',
  templateUrl: './designs.component.html',
  styleUrls: ['./designs.component.scss']
})
export class DesignsComponent {

  cards:CardDesignModel[] = [];
  allTimeCards:CardDesignModel[] = [];
  
  private CardDesignService = inject(CardDesignService);
  private CommonutilService = inject(CommonutilService);

  ngOnInit(): void {
    this.getTheCardDesigns();
  }

  getTheCardDesigns() {
    console.log("CardDesignComponent  :: " + "getTheCardDesigns method :: ");

    this.CardDesignService.retrieveCardDesigns().subscribe(data => {
      this.cards = data.filter(x => x.collection === "weekly");
      this.allTimeCards = data.filter(x => x.collection === "all-time");
    });
  }

  goToAi() {
    console.log("Comming soon!");
  }

  goToHome(){
    this.CommonutilService.goToPageByUrl('home');
  }
   
  isActive(){
    this.CommonutilService.isActive("home");
  }
}
