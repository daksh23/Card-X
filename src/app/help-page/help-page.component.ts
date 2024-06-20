import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonutilService } from '../Services/commonutil.service';
import { HelpPageService } from '../Services/help-page.service';
import { HelpPageModal } from '../Model/HelpPage.modal';

@Component({
  selector: 'app-help-page',
  templateUrl: './help-page.component.html',
  styleUrls: ['./help-page.component.scss']
})
export class HelpPageComponent {

  constructor(private commonutilService:CommonutilService, private helpPageService:HelpPageService){ }

  @ViewChild('inquiryForm') form!: NgForm;

  helpPageModal!: HelpPageModal;

  image: File | null = null;
  submitted:boolean = false;
  refNumber:string = "";

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
    this.helpPageModal = {
      userName: `${this.form.value.firstName} ${this.form.value.lastName}`,
      email: this.form.value.email,
      phoneNumber: this.form.value.phone,
      subject: this.form.value.subject,
      question: this.form.value.question,
      help_image: '' // Assuming you will handle this separately
    };

    console.log("fillData method :: helpPageModal Object :: " + this.commonutilService.printObjectValues(this.helpPageModal));
    

    this.helpPageService.sendHelpPageData(this.helpPageModal).subscribe(response => {
      console.log("helpPage class :: fillData method :: Reference Number :: " + response);
      this.refNumber = response;
    });
  }
  

  redirectToHome(){
    this.commonutilService.goToPageByUrl('home');
  }

}
