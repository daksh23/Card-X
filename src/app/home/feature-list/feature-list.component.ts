import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FeaturesModel } from 'src/app/Model/Featrures.model';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss']
})
export class FeatureListComponent {

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
