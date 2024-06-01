import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { CardDesignModel } from 'src/app/Model/cardDesign.model';

@Component({
  selector: 'app-card-design',
  templateUrl: './card-design.component.html',
  styleUrls: ['./card-design.component.scss']
})
export class CardDesignComponent implements OnInit {
  
  title: string = 'Most Loved Designs';

  cards:CardDesignModel[] = [];

  private httpClient = inject(HttpClient);

  ngOnInit(): void {
    this.getTheCardDesigns();
  }

  getTheCardDesigns() {
    console.log("getTheCardDesigns method :: ");

    this.httpClient.get<CardDesignModel[]>('./assets/constants/CardDesigns.json').subscribe(data => {
          this.cards = data;
    });
  }
}
