import { Component, inject, OnInit } from '@angular/core';
import { CardDesignModel } from '../Model/CardDesign.model';
import { CardDesignService } from '../Services/card-design.service';
import { CommonutilService } from '../Services/commonutil.service';
import { AuthenticationService } from '../Services/authentication.service';
import { MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import { CardModelComponent } from './card-model/card-model.component';

@Component({
  selector: 'app-designs',
  templateUrl: './designs.component.html',
  styleUrls: ['./designs.component.scss']
})
export class DesignsComponent implements OnInit {

  cards: CardDesignModel[] = [];
  allTimeCards: CardDesignModel[] = [];

  private cardDesignService: CardDesignService = inject(CardDesignService);
  private commonutilService: CommonutilService = inject(CommonutilService);
  private authenticationService: AuthenticationService = inject(AuthenticationService);
  // private dialogRef = inject(MatDialogRef<DesignsComponent>);
  private dialog: MatDialog = inject(MatDialog);

  ngOnInit(): void {
    this.getTheCardDesigns();
  }

  getTheCardDesigns() {
    console.log("CardDesignComponent  :: " + "getTheCardDesigns method :: ");
    this.cardDesignService.retrieveCardDesigns().subscribe(data => {
      console.log("CardDesign Api response from getTheCardDesign method :: " + this.commonutilService.printObjectValues(data));
      
      this.cards = data.filter(x => x.collection === "weekly");
      this.allTimeCards = data.filter(x => x.collection === "all-time");
    });
  }

  routeFunc(value: string) {
    this.commonutilService.goToPageByUrl(value);
  }

  isActive(value: string): boolean {
    return this.commonutilService.isActive(value);
  }

  isLoggedIn() {
    return this.authenticationService.isLoggedIn();
  }

  // Ensure this function works correctly when a card is clicked
  cardSelected(value: CardDesignModel) {
    console.log("Card clicked :: Open Dialog with Single Card Details :: ", value);

    const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
        cardDetails:value // Pass cardDetails into model
      }
  
      // Open Dialog with Card Details
      this.dialog.open(CardModelComponent, dialogConfig);
  }
}
