import { Component, inject } from '@angular/core';
import { CardDesignModel } from '../Model/CardDesign.model';
import { CardDesignService } from '../Services/card-design.service';
import { CommonutilService } from '../Services/commonutil.service';

@Component({
  selector: 'app-all-designs',
  templateUrl: './all-designs.component.html',
  styleUrls: ['./all-designs.component.scss']
})
export class AllDesignsComponent {
  
  cards:CardDesignModel[] = [];
  
  private cardDesignService = inject(CardDesignService);
  private commonutilService = inject(CommonutilService);

  ngOnInit(): void {
    this.getAllTheCardDesigns();
  }

  getAllTheCardDesigns() {
    console.log("AllDesignsComponent  :: " + "getAllTheCardDesigns method :: ");

    this.cardDesignService.retrieveCardDesigns().subscribe(data => {
      this.cards = data;
    });
  }

  goToDesign() {
    this.commonutilService.goToPageByUrl('card-designs');
  }
  
  isActive(value:string){
    this.commonutilService.isActive(value);
  }

}
