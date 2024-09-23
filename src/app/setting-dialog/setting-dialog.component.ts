import { Component, inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CommonutilService } from '../Services/commonutil.service';

@Component({
  selector: 'app-setting-dialog',
  templateUrl: './setting-dialog.component.html',
  styleUrls: ['./setting-dialog.component.scss']
})
export class SettingDialogComponent {

  private dialogRef = inject(MatDialogRef<SettingDialogComponent>);
  private dialog: MatDialog = inject(MatDialog);
  private commonutilService:CommonutilService = inject(CommonutilService);
  
  close() {
    this.dialogRef.close();
  }

  logout() {
    // remove token from localstorage
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('email');
    
    // close the model
    this.close();

    // Moved to home page.
    this.commonutilService.goToPageByUrl('/home');

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
