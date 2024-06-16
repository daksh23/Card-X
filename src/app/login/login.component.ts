import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginModal } from '../Model/Login.modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginDetails:LoginModal[] = [];

  onSubmit(ngForm:NgForm){
    console.log("Login Form :: ", ngForm.value);
    this.loginDetails = ngForm.value;

    console.log("LoginDetails :: ", this.loginDetails);
    
  }
}
