import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FeaturesModel } from '../Model/Featrures.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeaturesService {

  private httpClient = inject(HttpClient);
  features:FeaturesModel[] = [];

  retrieveFeaturesList(): Observable<FeaturesModel[]> {
    console.log("Service class :: FeaturesService :: " + "retrieveFeaturesList method :: ");
    return this.httpClient.get<FeaturesModel[]>('./assets/constants/Features.json');
  }

}
