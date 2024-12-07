import { Component, Input, OnInit } from '@angular/core';
import { PaymentService } from '../Services/payment.service';
import { CardDesignModel } from '../Model/CardDesign.model';
import { CommonutilService } from 'src/app/Services/commonutil.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements OnInit {
 
  @Input() totalAmount!:string;
  @Input() cardDesigns!:CardDesignModel;
  paymentId:String = '';
  email:String | null = '';
  payerId:String = '';
  paymentCompletedFlag:boolean = false;

  constructor( private paymentService:PaymentService, private commonutilService:CommonutilService){ }
  
  ngOnInit(): void {
    console.log("PaypalComponent component :: Parameters at start :: totalAmount :: " + this.totalAmount + ":: cardDesign Object :: " +this.commonutilService.printObjectValues( this.cardDesigns));

    // Retireve UserName
    this.retrieveUserName();

    this.loadPayPalScript()
      .then(() => this.renderPayPalButtons())
      .catch(error => console.error('PayPal SDK failed to load', error));
  }

  private loadPayPalScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if ((<any>window).paypal) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://www.paypal.com/sdk/js?client-id=AfXrsMWAqkukWC71wy7_OuUCA84joOhxc2tlfTK8fb5sq6IptI1in35n1lPZ2ZMh1LFWzIDRgYVjRyQ2&currency=CAD';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('PayPal SDK could not be loaded.'));
      document.body.appendChild(script);
    });
  }

  private renderPayPalButtons(): void {
    const paypal = (<any>window).paypal;
  
    if (paypal) {
      paypal.Buttons({
        createOrder: async (): Promise<string> => {
          try {
            // Wait for the payment creation response
            const response = await firstValueFrom(this.paymentService.createPayment(this.totalAmount));
  
            console.log("createOrder method response:", response);
            const approvalUrl = response.approvalUrl;
  
            if (!approvalUrl) {
              throw new Error("Approval URL is missing in the response");
            }

            // Extract the `token` from the approval URL
            const orderId = new URL(approvalUrl).searchParams.get('token');
            if (!orderId) {
              throw new Error("Order ID (token) is missing in the approval URL");
            }
  
            return orderId; // Return the token as the order ID
          } catch (error) {
            console.error("Error during createOrder:", error);
            throw error;
          }
        },
  
        onApprove: async (data: any): Promise<void> => {
          try {
            // Use `data` to extract necessary information
            console.log("onApprove callback:", data);

            // Get payerId, orderId and paymentId to complete payment execution
            const payerId = data.payerID;
            const orderId = data.orderID; 
            const paymentId = data.paymentID;
         

            const result = await firstValueFrom(this.paymentService.executePayment( paymentId, payerId , orderId, this.email, this.cardDesigns ));
            console.log("executePayment response:", result);

            if(result != null){
              // Redirect to Confirmation Page.
            }

          } catch (error) {
            console.error("Error during onApprove:", error);
            alert("Error completing payment. Please try again.");
          }
        },
  
        onError: (err: any): void => {
          console.error("PayPal Button Error:", err);
        }
      }).render('#paypal-button-container');
    } else {
      console.error('PayPal SDK not available.');
    }
  }

  // UserName Retrieve
  retrieveUserName(): void {
    this.email = localStorage.getItem('email');
    console.log("Email Retrieved :: before payment execution call :: " + this.email);
  }
}
