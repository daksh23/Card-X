import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EducationModal } from 'src/app/Model/Education.modal';
import { ExperienceModal } from 'src/app/Model/Experience.modal';
import { ResponseModal } from 'src/app/Model/Response.modal';
import { UserModel } from 'src/app/Model/User.model';
import { CommonutilService } from 'src/app/Services/commonutil.service';
import { ProfileService } from 'src/app/Services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  defaultUrl:string = 'https://shorturl.at/sx09W';

  userDetails?:UserModel;
  userEducation:EducationModal[] = [];
  userExperience:ExperienceModal[] = [];

  private commonutilService:CommonutilService = inject(CommonutilService);
  private profileService:ProfileService = inject(ProfileService);

  private http: HttpClient = inject(HttpClient);

  filedata:any;
  newImageName:string = '';
  uploadResponse:ResponseModal | null = null;
                                                                                                                                 
  ngOnInit(): void {
    this.profileService.retrieveProfile().subscribe((data) =>{
      this.userDetails = data;
      console.log("ProfileComponent :: ngOnInit :: profile response data :: " + this.commonutilService.printObjectValues(this.userDetails));

      // Education setup                   
      this.userEducation = data.education;                                                                   
         
      // Experience
      this.userExperience = data.experience;

      this.newImageName = data.personalInfo.image;

      if(this.newImageName == 'false'){
          this.defaultUrl = 'assets/profile/' + this.newImageName + '.jpg';
          this.newImageName = data.personalInfo.userName;
      }
      
      console.log("ProfileComponent :: ngOnInit :: NewImageName :: " + this.newImageName + "defaultUrl :: " + this.defaultUrl);
    });
  }

  logout() {
    // remove token from localstorage
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('email');

    // Reload the window
    location.reload();
  }

  openLink(value:string | undefined){
    if(value) window.open(value, '_blank')
    else console.log("ProfileComponent :: openLink :: social media link is undefined ");
  }

   /* File onchange event */
  fileEvent(e:any){
    console.log("ProfileComponent :: method fileEvent :: " + e );
    this.filedata = e.target.files[0];

    // upload method call
    this.upload();
  }

  /* Upload button functioanlity */
  upload() {
    console.log("ProfileComponent :: method Upload :: ");
    if (!this.filedata) {
      console.error('No file selected.');
      return;
    }

    const myFormData = new FormData();
    myFormData.append('file', this.filedata);
    myFormData.append('fileName', this.newImageName);

    const headers = new HttpHeaders({
      Accept: 'application/json'
    });
    
    /* Image Post Request */
    this.http.post('http://localhost:8081/cardx/rest/v1/upload', myFormData, {headers, responseType: 'text'}).subscribe((data: any) => {
      console.log("ProfileComponent :: Upload method :: " +data);
  
      this.uploadResponse = this.commonutilService.mapResponse(data);
  
      if(this.uploadResponse.complete != undefined){
        // Reload Window
        window.location.reload();
      }
    });  
  }

}
