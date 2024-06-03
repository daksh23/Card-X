import { Component, inject } from '@angular/core';
import { FeaturesModel } from 'src/app/Model/Featrures.model';
import { Router } from '@angular/router';
import { FeaturesService } from 'src/app/Services/features.service';
import { CommonutilService } from '../../Services/commonutil.service';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss'],
})
export class FeatureListComponent {

  features:FeaturesModel[] = [];

  private router = inject(Router);
  private featuresService = inject(FeaturesService);
  private CommonutilService = inject(CommonutilService);
  
  ngOnInit(): void {
    this.getTheFeatureData();
  }

  getTheFeatureData() {
    console.log(" FeatureListComponent :: " + "getTheFeatureData Method :: ");

    // Subscribe return Observable returned by Calling Feature Service method to retrieve featuresList Data 
    this.featuresService.retrieveFeaturesList().subscribe(data => {
      this.features = data.slice(0, 3);
    });
  }

  toFeaturePage(){
    this.CommonutilService.goToPageByUrl("features");
  }

  isActive(){
    this.CommonutilService.isActive("features");
  }
  
}
