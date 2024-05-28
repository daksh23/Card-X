import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FeaturesModel } from '../Model/Featrures.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  features:FeaturesModel[] = [];

  private httpClient = inject(HttpClient);

  ngOnInit(): void {
    this.getTheFeatureData();
  }

  getTheFeatureData() {
    console.log("getTheFeatureData method :: ");

    this.httpClient.get<FeaturesModel[]>('./assets/constants/Features.json').subscribe(data => {
          this.features = data;
    });
  }

}
