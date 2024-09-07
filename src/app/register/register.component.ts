import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { RegisterService } from '../Services/register.service';
import { ResponseModal } from '../Model/Response.modal';
import { CommonutilService } from '../Services/commonutil.service';
import { ValidateUrl } from '../Validators/url.validator';
import { PasswordMatchValidator } from '../Validators/passwrod-match.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  response?: ResponseModal;
  userData: any = null;
  page:number = 1;
  home:string = 'home';
  login:string = "login";

  router:Router = inject(Router);

  CommonutilService:CommonutilService = inject(CommonutilService);


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
        image: [''],
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

  ngOnInit(): void {}

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

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      
      this.userData = this.registerService.transformData(this.registerForm.value);
      this.sendData(JSON.stringify(this.userData, null, 2));
      console.log('User Data:', JSON.stringify(this.userData, null, 2));
    }
  }

  sendData(userDetails: string): void {
    this.registerService.sendUserData(userDetails).subscribe(response => {
      console.log('Response from API:', response);
      this.response = this.commonutilService.mapResponse(response);
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      console.log('User Profile:', file);
    }
  }

  routeFunc(value:string){
    this.CommonutilService.goToPageByUrl(value);
  }
  
  isActive(value:string):boolean {
    return this.CommonutilService.isActive(value);
  }
}
