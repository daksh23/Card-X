import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from 'src/app/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { BannerComponent } from './home/banner/banner.component';
import { CardDesignComponent } from './home/card-design/card-design.component';
import { FeaturesComponent } from './features/features.component';
import { DesignsComponent } from './designs/designs.component';
import { PricingComponent } from './pricing/pricing.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FeatureListComponent } from './home/feature-list/feature-list.component';
import { FeaturesService } from './Services/features.service';
import { CardDesignService } from './Services/card-design.service';
import { CommonutilService } from './Services/commonutil.service';
import { FormsModule } from '@angular/forms';
import { CardAIComponent } from './card-ai/card-ai.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllDesignsComponent } from './all-designs/all-designs.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    BannerComponent,
    CardDesignComponent,
    FeaturesComponent,
    DesignsComponent,
    PricingComponent,
    HelpPageComponent,
    NotFoundComponent,
    FeatureListComponent,
    CardAIComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    AllDesignsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    FormsModule      
  ],
  providers: [FeaturesService, CardDesignService, CommonutilService],
  bootstrap: [AppComponent]
})
export class AppModule { }
