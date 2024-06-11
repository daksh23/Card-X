import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardDesignModel } from 'src/app/Model/CardDesign.model';
import { CardDesignService } from '../../Services/card-design.service';
import { CommonutilService } from '../../Services/commonutil.service';

@Component({
  selector: 'app-card-design',
  templateUrl: './card-design.component.html',
  styleUrls: ['./card-design.component.scss']
})
export class CardDesignComponent implements OnInit {
  
  title: string = 'Most Loved Designs';

  cards:CardDesignModel[] = [];
  
  private CardDesignService = inject(CardDesignService);
  private CommonutilService = inject(CommonutilService);

  ngOnInit(): void {
    this.getTheCardDesigns();
  }

  getTheCardDesigns() {
    console.log("CardDesignComponent  :: " + "getTheCardDesigns method :: ");

    this.CardDesignService.retrieveCardDesigns().subscribe(data => {
      this.cards = data.splice(0, 3);
    });
  }

  toDesignPage(){
    this.CommonutilService.goToPageByUrl("card-designs");
  }

  isActive(){
    this.CommonutilService.isActive("card-designs");
  }
}
