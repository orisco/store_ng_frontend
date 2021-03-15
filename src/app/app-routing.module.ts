import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllCategoriesComponent } from './components/all-categories/all-categories.component';
import { ApiComponent } from './components/api/api.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { RegisterCheckComponent } from './components/register-check/register-check.component';
import { RegisterMainComponent } from './components/register-main/register-main.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  {path: "shopping/api", component: ApiComponent},
  {path:"sign-in", component: LoginComponent},
  {path: "sign-up", component: RegisterCheckComponent},
  {path: "sign-up-continue", component: RegisterMainComponent},
  {path: "checkout/:cartId", component: CheckoutComponent},
  {path: "welcome", component: WelcomeComponent},
  
  {path: "main", component: MainComponent,
  children: [
    {path: "allcategories", component: AllCategoriesComponent},
    {path: "admin/:productId", component: AllCategoriesComponent},
  ]},
  {path:"", pathMatch: "full" ,redirectTo:"welcome"},
  {path: "**", redirectTo:"main"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
