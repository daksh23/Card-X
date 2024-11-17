import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from 'src/app/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule, HttpClient } from '@angular/common/http';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardAIComponent } from './card-ai/card-ai.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SettingDialogComponent } from './setting-dialog/setting-dialog.component';
import { ChangePasswordComponent } from './setting-dialog/change-password/change-password.component';
import { OrderComponent } from './order/order.component';
import { CardModelComponent } from './designs/card-model/card-model.component';
import {TooltipPosition, MatTooltipModule} from '@angular/material/tooltip';
import { AiComponent } from './home/ai/ai.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { DashboardBannerComponent } from './dashboard/dashboard-banner/dashboard-banner.component';
import { catchError, firstValueFrom, of } from 'rxjs';

async function appInitializer(http:HttpClient){
  try{
    const response = await firstValueFrom(http.get('http://localhost:4200/cardx/rest/v1/health/status'));
  }catch (error) {
    console.error('Backend service is unavailable:', error);
    document.body.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh;">
        <h1 style="color: red;">Service Unavailable</h1>
        <p>The application cannot start because the backend service is not reachable. Please try again later.</p>
      </div>
    `;
  }
}

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
    SettingDialogComponent,
    ChangePasswordComponent,
    OrderComponent,
    CardModelComponent,
    AiComponent,
    ProfileComponent,
    DashboardBannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTooltipModule
  ],
  providers: [
    FeaturesService, 
    CardDesignService, 
    CommonutilService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      deps: [HttpClient],
      multi: true,
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }
