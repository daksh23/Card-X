import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CardDesignModel } from '../Model/CardDesign.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardDesignService {

  constructor(private httpClient:HttpClient) { }


  retrieveCardDesigns() : Observable<CardDesignModel[]> {
    console.log("Service class :: CardDesignService :: " + "retrieveCardDesigns method :: ");

   return this.httpClient.get<CardDesignModel[]>('./assets/constants/CardDesigns.json');
  }
}
