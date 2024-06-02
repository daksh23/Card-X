import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  features:string = 'features';
  cardDesign:string = 'card-designs';
  pricing:string = 'pricing';
  help:string = 'help';
  home:string = 'home';

  router:Router = inject(Router);

  routeFunc(value:string){
    this.router.navigate([`/${value}`]);
  }
  
  isActive(value:string):boolean {
    return this.router.url.includes(value);    
  }

}
