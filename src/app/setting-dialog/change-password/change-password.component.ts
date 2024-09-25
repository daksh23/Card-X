import {Component, inject, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from '@angular/router';
import {ResponseModal} from 'src/app/Model/Response.modal';
import {CommonutilService} from 'src/app/Services/commonutil.service';
import {RegisterService} from 'src/app/Services/register.service';
import { AuthenticationService } from '../../Services/authentication.service';

@Component({selector: 'app-change-password', templateUrl: './change-password.component.html', styleUrls: ['./change-password.component.scss']})
export class ChangePasswordComponent implements OnInit {

    currentPassword : string = "";
    newPassword : string = "";
    confirmPassword : string = "";
    email : string | null = "";
    errorMessage : string = "";
    response?: ResponseModal;
    successMessage : string = "";

    private dialogRef = inject(MatDialogRef < ChangePasswordComponent >);

    constructor(private registerService : RegisterService, private router : Router, 
      private authenticationService : AuthenticationService,
      private commonutilService:CommonutilService) {}

    ngOnInit() : void {
        this.retrieveEmail();
        if (this.email == null || this.email == '') {
            this.errorMessage = "Its us, Please try again later after sometime, do logout first!, Thank you!";
            return;
        }
    }

    close() {
        this
            .dialogRef
            .close();
    }

    onSubmit(ngForm : NgForm) {
        console.log("Change Pasword Form :: ", ngForm);

        this.currentPassword = ngForm.value.currentPassword;
        this.newPassword = ngForm.value.newPassword;
        this.confirmPassword = ngForm.value.confirmPassword;

        console.log("Change Pasword Form values :: ", ngForm.value);

        if (ngForm.valid && (this.email != null || this.email != '')) {
            console.log("changePassword method started after submit ::");
            this.changePassword();
        } else {
            console.log("changePassword method not started after submit :: as form isnt VALID :: ");
        }
    }

    retrieveEmail() {
        this.email = localStorage.getItem('email');
        console.log("retrieveEmail method called from changePassword component :: email=" + this.email);

    }

    changePassword() : void {
        this
            .registerService
            .changePassword(this.currentPassword, this.newPassword, this.confirmPassword, this.email)
            .subscribe(response => {
                console.log('changePassword method :: changePassword Api response ::', response);

                if (response != null && response.Error) {
                  this.errorMessage = response.Error;
                }else{
                  this.successMessage = response.Completed;

                    setTimeout(() => {
                      this.close(); // close the model
                      this.authenticationService.logout(); // logout the application
                      this.commonutilService.goToPageByUrl('/login'); // redirected to login page
                    }, 10000);
                }

            });
    }

}