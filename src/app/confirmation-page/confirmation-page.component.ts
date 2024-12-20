import { Component, OnInit } from '@angular/core';
import { CardDesignModel } from '../Model/CardDesign.model';
import { CommonutilService } from '../Services/commonutil.service';
import { EmailService } from '../Services/email.service';

@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.scss']
})
export class ConfirmationPageComponent implements OnInit {
  
  card?:CardDesignModel;
  public isDirectly:boolean = false;

  constructor(private commonutilService:CommonutilService, private emailService:EmailService){}

  ngOnInit(): void {
  
    if(history.state.isDirectly != null && history.state.isDirectly && history.state.card != null){
      console.log("history in confirmationComponent :: " + this.commonutilService.printObjectValues(history.state));
      
      this.isDirectly = true;
      this.card = history.state.card;
    }
    
    console.log(" ConfirmationPageComponent :: Inputs AfterCheck :: cardDesign :: " + this.commonutilService.printObjectValues(this.card) + ":: Directly ::" + this.isDirectly);
    

    // Send Email to user
    this.sendEmail();
  }

  
  goToHome(){
    this.commonutilService.goToPageByUrl("home");
  }
  
  isActive(){
    this.commonutilService.isActive("home");
  }

  sendEmail(){   
    const email = localStorage.getItem('email');
    const subject = 'ORDER - Invoice';
    const body = '<html> <h1>  Thank you for your order!  </h1> <p> Your Total order amount is :' 
    + this.card?.designAmount + 
    '</p></html>';

    this.emailService.sendEmail(email, subject, body).subscribe(data => {
      console.log("Mail Response :: " + data);
    });
  }

}
