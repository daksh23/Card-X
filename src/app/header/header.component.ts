import { Component, inject, OnInit, ViewChild  } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonutilService } from '../Services/commonutil.service';
import { SettingDialogComponent } from '../setting-dialog/setting-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { AuthenticationService } from '../Services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  features:string = 'features';
  cardDesign:string = 'card-designs';
  allCardDesign:string = "all-designs";
  pricing:string = 'pricing';
  help:string = 'help';
  home:string = 'home';
  login:string = "login";
  register:string = "register";
  dashboard:string = "dashboard";
  currentRoute:string = "";
  isDashboard:boolean = false;

  private router:Router = inject(Router);
  private commonutilService:CommonutilService = inject(CommonutilService);
  private authenticationService: AuthenticationService = inject(AuthenticationService);
  private dialog: MatDialog = inject(MatDialog);

  ngOnInit(): void {
    // Get current Path and check if its Dashboard or not if yes and show profile icon and fuctionalities or use as dashboard navigator
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
        this.isDashboard = this.currentRoute === "/dashboard"; // Cache the result
        console.log('In Header Active Path :: currentPath ::' + this.currentRoute + " and this isDashboard :: " + this.isDashboard);
      }
    });
  }

  routeFunc(value:string){
    this.commonutilService.goToPageByUrl(value);
  }
  
  isActive(value:string):boolean {
    return this.commonutilService.isActive(value);
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  openSettingsModel(){
    console.log("openSettingModel method :: HeaderComponent :: ");
    
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(SettingDialogComponent, dialogConfig);
  }
}