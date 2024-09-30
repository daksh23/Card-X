import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CardDesignModel } from 'src/app/Model/CardDesign.model';
import { CommonutilService } from '../../Services/commonutil.service';
import { AuthenticationService } from '../../Services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-model',
  templateUrl: './card-model.component.html',
  styleUrls: ['./card-model.component.scss']
})
export class CardModelComponent {
  
  card: CardDesignModel;
  register:string = 'register';
  login:string = 'login';
  order:string = 'order';

  private dialogRef = inject(MatDialogRef <CardModelComponent>);
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: { cardDetails: CardDesignModel }, private commonutilService:CommonutilService,
              private authenticationService:AuthenticationService, private router: Router) {
    this.card = data.cardDetails;
  }

  close() {
      this.dialogRef.close();
  }

  routeFunc(value:string){
    console.log("Route path in design Model :: " + value);

    if( value === this.order)
      this.router.navigate([`/${value}`], {state:{ card: this.card }});
    else
      this.commonutilService.goToPageByUrl(value);


    // Close the dialog
    this.dialogRef.close();
  }
  
  isActive(value:string):boolean {
    return this.commonutilService.isActive(value);
  }

  isLoggedIn(){
    return this.authenticationService.isLoggedIn();
  }
}
