import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { ResponseModal } from 'src/app/Model/Response.modal';
import { CommonutilService } from 'src/app/Services/commonutil.service';
import { RegisterService } from 'src/app/Services/register.service';
import { AuthenticationService } from '../../Services/authentication.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  currentPassword: string = "";
  newPassword: string = "";
  confirmPassword: string = "";
  email: string | null = "";
  errorMessage: string = "";
  response?: ResponseModal;
  successMessage: string = "";
  passwordMismatch: boolean = false;  // Flag to track if passwords mismatch

  constructor(
    private dialogRef: MatDialogRef<ChangePasswordComponent>,
    private registerService: RegisterService,
    private router: Router, 
    private authenticationService: AuthenticationService,
    private commonutilService: CommonutilService
  ) {}

  ngOnInit(): void {
    this.retrieveEmail();
    if (this.email == null || this.email == '') {
      this.errorMessage = "It's us, Please try again later after sometime, do logout first!, Thank you!";
      return;
    }
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit(ngForm: NgForm) {
    this.currentPassword = ngForm.value.currentPassword;
    this.newPassword = ngForm.value.newPassword;
    this.confirmPassword = ngForm.value.confirmPassword;

    if (ngForm.valid && !this.passwordMismatch) {
      this.changePassword();
    }
  }

  // Method to check if passwords match
  checkPasswords() {
    this.passwordMismatch = this.newPassword !== this.confirmPassword;
  }

  retrieveEmail() {
    this.email = localStorage.getItem('email');
  }

  changePassword(): void {
    this.registerService.changePassword(this.currentPassword, this.newPassword, this.confirmPassword, this.email)
      .subscribe(response => {
        if (response != null && response.Error) {
          this.errorMessage = response.Error;
        } else {
          this.successMessage = response.Completed;

          setTimeout(() => {
            this.close(); // Close the modal
            this.authenticationService.logout(); // Logout the user
            this.commonutilService.goToPageByUrl('/login'); // Redirect to login page
          }, 10000);
        }
      });
  }
}
