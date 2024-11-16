import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { RegisterService } from '../Services/register.service';
import { ResponseModal } from '../Model/Response.modal';
import { CommonutilService } from '../Services/commonutil.service';
import { ValidateUrl } from '../Validators/url.validator';
import { PasswordMatchValidator } from '../Validators/passwrod-match.validator';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  response?: ResponseModal;
  userData: any = null;
  page:number = 1;
  home:string = 'home';
  register:string = 'register';
  login:string = "login";
  filedata:any;
  uploadResponse:ResponseModal | null = null;
  router:Router = inject(Router);
  userName:any = '';
  uploadProfilePhotoInd: boolean = true;
  uploadProfilePhotoErrorMsg: string = 'Its us, not you, Profile photo not uploaded, please try after login';

  private http: HttpClient = inject(HttpClient);

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private commonutilService: CommonutilService
  ) {
    this.registerForm = this.fb.group({
      personalInfo: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        bio: ['', Validators.required],
        image: ['false'],
        address: this.fb.group({
          country: ['', Validators.required],
          state: ['', Validators.required],
          city: ['', Validators.required]
        }),
        credentials: this.fb.group({
          password: ['', [
            Validators.required,
            PasswordMatchValidator('confirmPassword', true)
          ]],
          confirmPassword: ['', [
            Validators.required,
            PasswordMatchValidator('password')
          ]],
        })
      }),
      socialMedia: this.fb.group({
        instagram: ['', [Validators.required, ValidateUrl]],
        x: ['', [Validators.required, ValidateUrl]],
        linkedIn: ['', [Validators.required, ValidateUrl]]
      }),
      education: this.fb.array([this.createEducationGroup()]),
      experience: this.fb.array([this.createExperienceGroup()])
    });
    
  }
  
  routeFunc(value:string){
    this.commonutilService.goToPageByUrl(value);
  }
  
  isActive(value:string):boolean {
    return this.commonutilService.isActive(value);
  }


  nextPage(){
    if(this.page < 4) this.page ++;
  }

  createEducationGroup(): FormGroup {
    return this.fb.group({
      study: [''],
      current: [false],
      eduStart: [''],
      eduEnd: [''],
      university: [''],
      uniCountry: [''],
      uniState: ['']
    });
  }

  createExperienceGroup(): FormGroup {
    return this.fb.group({
      job: [''],
      present: [false],
      exStart: [''],
      exEnd: [''],
      companyName: ['']
    });
  }

  get educationControls(): FormArray {
    return this.registerForm.get('education') as FormArray;
  }

  get experienceControls(): FormArray {
    return this.registerForm.get('experience') as FormArray;
  }

  addEducation(): void {
    this.educationControls.push(this.createEducationGroup());
  }

  removeEducation(index: number): void {
    if (this.educationControls.length > 1) {
      this.educationControls.removeAt(index);
    }
  }

  addExperience(): void {
    this.experienceControls.push(this.createExperienceGroup());
  }

  removeExperience(index: number): void {
    if (this.experienceControls.length > 1) {
      this.experienceControls.removeAt(index);
    }
  }
  
  getEmailFromFormControl(){
    let email = this.registerForm.get('personalInfo.email')?.value;
    console.log("Component Register :: method getEmailFromFormControl :: Retrieved Email :: " + email);
    return email;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
    
      // After Profile image then submit the 
      this.userData = this.registerService.transformData(this.registerForm.value);
      this.sendData(JSON.stringify(this.userData, null, 2));
      console.log('Component Register :: User Data:', JSON.stringify(this.userData, null, 2));
    }
  }

  sendData(userDetails: string): void {
    this.registerService.sendUserData(userDetails).subscribe(response => {
      console.log('Component Register:: Response from API:', response);
      this.response = this.commonutilService.mapResponse(response);

      if(this.response.complete != null && this.uploadProfilePhotoInd){
          // Upload Image if user selected
          this.upload(this.userName);
      }

    });
  }

  onFileChange(event: any): void {
    this.filedata = event.target.files[0];
    
    // Take email to create a userName for profile image
    if (!this.filedata && this.getEmailFromFormControl() == null){
      console.error('No file selected.');
      this.uploadProfilePhotoInd = false;
      return;
    }else {
        // set username as profile image name for users
        this.userName = this.commonutilService.getUserName(this.getEmailFromFormControl());
        if(this.userName == null || this.userName == ''){
          console.error('Component Register :: No useName found ::');
          this.uploadProfilePhotoInd = false;
          return;
        }
    }
  }

  upload(userName:any) {
    console.log("Component Register :: method Upload :: " + "with userName :: " + userName);
      
    const myFormData = new FormData();
    myFormData.append('file', this.filedata);
    myFormData.append('fileName', userName);

    const headers = new HttpHeaders({
      Accept: 'application/json'
    });
    
    /* Image Post Request */
    this.http.post('http://localhost:8081/cardx/rest/v1/upload', myFormData, {headers, responseType: 'text'}).subscribe((data: any) => {
      console.log("ProfileComponent :: Upload method :: " +data);
  
      this.uploadResponse = this.commonutilService.mapResponse(data);
      
      if(this.uploadResponse.error != null){
        this.uploadProfilePhotoInd = false;
      }

    });  
  }
}
