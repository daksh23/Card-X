import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CardDesignModel } from 'src/app/Model/CardDesign.model';

@Component({
  selector: 'app-paypal-model',
  templateUrl: './paypal-model.component.html',
  styleUrls: ['./paypal-model.component.scss']
})
export class PaypalModelComponent {

  private dialogRef = inject(MatDialogRef<PaypalModelComponent>);
  amount:string = '';
  cardDesign:CardDesignModel;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { amount: string, cardDesign:CardDesignModel }){
    this.amount = data.amount;
    this.cardDesign = data.cardDesign;
  }
  
  close(): void {
    console.log("Close function :: ");
    
    this.dialogRef.close();
  }

}
