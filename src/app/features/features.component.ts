import { Component } from '@angular/core';
import { FeaturesModel } from '../Model/Featrures.model';
import { FeaturesService } from '../Services/features.service';
import { CommonutilService } from '../Services/commonutil.service';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent {
  features: FeaturesModel[] = [];

  constructor(private featuresService: FeaturesService, private CommonutilService:CommonutilService) {}

  ngOnInit(): void {
    this.featuresService.retrieveFeaturesList().subscribe(data => {
      this.features = data; // Assign only the first 4 records
    });
  }

  goToHome(){
    this.CommonutilService.goToHome("home");
  }
  
  isActive(){
    this.CommonutilService.isActive("home");
  }

}
