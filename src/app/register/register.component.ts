import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserModel } from '../Model/User.model';
import { FileService } from '../Services/file.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  educationControls: number[] = [0];
  experienceControls: number[] = [0];

  userData: UserModel[] = [];

  constructor(private fileService:FileService) {}

  onSubmit(form: NgForm): void {
    console.log('Form Submitted:', form.value);

    this.userData = form.value;

    console.log('User Data:', this.userData);
  }

  addEducation(): void {
    this.educationControls.push(this.educationControls.length);
  }

  removeEducation(index: number): void {
    if (this.educationControls.length > 1) {
      this.educationControls.splice(index, 1);
    }
  }

  addExperience(): void {
    this.experienceControls.push(this.experienceControls.length);
  }

  removeExperience(index: number): void {
    if (this.experienceControls.length > 1) {
      this.experienceControls.splice(index, 1);
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.fileService.uploadFile(file).subscribe(data =>
        console.log('File uploaded successfully:', data)
      );
    }
  }

  
}
