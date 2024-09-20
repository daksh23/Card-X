import { Component, inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import { ChangePasswordComponent } from './change-password/change-password.component';

@Component({
  selector: 'app-setting-dialog',
  templateUrl: './setting-dialog.component.html',
  styleUrls: ['./setting-dialog.component.scss']
})
export class SettingDialogComponent {

  private dialogRef = inject(MatDialogRef<SettingDialogComponent>);
  private dialog: MatDialog = inject(MatDialog);
  
  close() {
    this.dialogRef.close();
  }

  logout() {
    // remove token from localstorage
    localStorage.removeItem('jwtToken');
  }

  changePassword() {

    // change password model
    console.log("changePassword method :: SettingDialogComponent :: ");
    
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(ChangePasswordComponent, dialogConfig);

    // Close exists model
    this.close();
  }
}
