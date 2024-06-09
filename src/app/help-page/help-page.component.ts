import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonutilService } from '../Services/commonutil.service';

@Component({
  selector: 'app-help-page',
  templateUrl: './help-page.component.html',
  styleUrls: ['./help-page.component.scss']
})
export class HelpPageComponent {

  @ViewChild('inquiryForm') form!: NgForm;

  constructor(private commonutilService:CommonutilService){ }
  
  firstName:String = "";
  lastName:String = "";
  email:String = "";
  phone:String = "";
  subject:String = "";
  question:String = "";
  image: File | null = null;
  submitted:boolean = false;

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.image = event.target.files[0];
    } else {
      this.image = null;
    }
  }

  onSubmit() {
    console.log(this.form);

    if(this.form.valid){
      this.fillData();
      this.submitted = true;
    }
  }

  fillData(){
    this.firstName = this.form.value.firstName;
    this.lastName = this.form.value.lastName;
    this.email = this.form.value.email;
    this.phone = this.form.value.phone;
    this.question = this.form.value.question;
    this.subject = this.form.value.subject;
  }
  

  redirectToHome(){
    this.commonutilService.goToPageByUrl('home');
  }

}
