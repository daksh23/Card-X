import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { FeaturesComponent } from './features/features.component';
import { DesignsComponent } from './designs/designs.component';
import { PricingComponent } from './pricing/pricing.component';
import { CardAIComponent } from './card-ai/card-ai.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllDesignsComponent } from './all-designs/all-designs.component';
import { authGuard } from './guards/auth.guard';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  { path:'home', redirectTo:'', pathMatch:'full' },
  { path:'', component:HomeComponent },
  { path:'help', component:HelpPageComponent },
  { path:'features', component:FeaturesComponent },
  { path:'card-designs', component:DesignsComponent },
  { path:'all-designs', component:AllDesignsComponent },
  { path:'pricing', component:PricingComponent },
  { path:'card-ai', component:CardAIComponent },
  { path:'login', component:LoginComponent },
  { path:'register', component:RegisterComponent },
  // {path:'order', component:OrderComponent, canActivate:[authGuard]},
  { path:'order', component:OrderComponent },
  { path:'dashboard', component:DashboardComponent , canActivate:[authGuard]},
  { path:'**', component:NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
