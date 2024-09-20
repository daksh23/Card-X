import { Component, inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  private dialogRef = inject(MatDialogRef<ChangePasswordComponent>);

  close() {
    this.dialogRef.close();
  }
  
}