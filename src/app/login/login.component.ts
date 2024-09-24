import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginModal } from '../Model/Login.modal';
import { AuthenticationService } from '../Services/authentication.service';
import { Router } from '@angular/router';
import { ResponseModal } from '../Model/Response.modal';
import { CommonutilService } from '../Services/commonutil.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email:string = "";
  password:string = "";
  response?: ResponseModal;
  token:string = "";
  error:string = "";
  
  constructor(private authService: AuthenticationService, private commonutilService:CommonutilService) {}

  onSubmit(ngForm:NgForm){
    console.log("Login Form :: ", ngForm.value);
    this.email = ngForm.value.email;
    this.password = ngForm.value.password;

    console.log("Login started after submit ::");

    //Call login method
    this.onLogin();
  }

  onLogin(): void {
    this.authService.loginAuth(this.email, this.password).subscribe(response => {
        console.log('onLogin method :: ' + 'Login response ::', response);
        
        // Assuming the token is returned as a field in the response
        const token = response.Token;
        
        if(response.Error){
            this.error = response.Error;
        }else{
          this.token = response.Token;
        }
                                             
        console.log('Login Response :: token=  ' + this.token + ' :: error= ' + this.error);

        if (token) {
          // Store JWT token in localStorage or sessionStorage
          localStorage.setItem('jwtToken', token);
          localStorage.setItem('email', this.email);

          this.commonutilService.goToPageByUrl('/dashboard');
        }

    });
  }
}