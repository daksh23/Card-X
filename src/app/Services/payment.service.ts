import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CardDesignModel } from 'src/app/Model/CardDesign.model';
import { CommonutilService } from './commonutil.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private commonutilService:CommonutilService) { }

  private httpClient = inject(HttpClient);

  createPayment(totalAmount:string): Observable<any> {
    console.log("PaymentService :: " + "createPayment method :: ");
    return this.httpClient.post<any>('http://localhost:8081/cardx/rest/v1/payment/create',{total: totalAmount});
  }

  executePayment( paymentId:String, payerId:String | null, orderId:String, userEmail:String | null , cardDesigns:CardDesignModel ): Observable<any> {
    console.log("PaymentService :: " + "executePayment method :: ");
    console.log("Print endpoint payload before execution :: ", payerId, orderId, paymentId, this.commonutilService.printObjectValues(cardDesigns));
    
    return this.httpClient.post<any>('http://localhost:8081/cardx/rest/v1/payment/execute', 
        { 
          paymentId: paymentId, 
          payerId: payerId,
          orderId: orderId,
          userEmail: userEmail, 
          cardDesigns: cardDesigns 
        });
  }

}
