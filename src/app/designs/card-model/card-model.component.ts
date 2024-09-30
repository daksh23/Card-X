import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CardDesignModel } from 'src/app/Model/CardDesign.model';
import { CommonutilService } from '../../Services/commonutil.service';

@Component({
  selector: 'app-card-model',
  templateUrl: './card-model.component.html',
  styleUrls: ['./card-model.component.scss']
})
export class CardModelComponent {
  
  card: CardDesignModel;
  register:string = 'register';
  login:string = 'login';

  private dialogRef = inject(MatDialogRef <CardModelComponent>);
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: { cardDetails: CardDesignModel }, private commonutilService:CommonutilService) {
    this.card = data.cardDetails;
  }

  close() {
      this.dialogRef.close();
  }

  routeFunc(value:string){
    this.commonutilService.goToPageByUrl(value);

    // Close the dialog
    this.dialogRef.close();
  }
  
  isActive(value:string):boolean {
    return this.commonutilService.isActive(value);
  }
}
