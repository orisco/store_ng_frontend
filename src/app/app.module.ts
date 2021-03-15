import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterCheckComponent } from './components/register-check/register-check.component';
import { RegisterMainComponent } from './components/register-main/register-main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './components/main/main.component';
import { AdminMainComponent } from './components/admin-main/admin-main.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CartComponent } from './components/cart/cart.component';
import { AllCategoriesComponent } from './components/all-categories/all-categories.component';
import { ByCategoriesComponent } from './components/by-categories/by-categories.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { WebRequestInterceptor } from './services/web-request-interceptor.service';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PersonNamePipe } from './pipe/person-name.pipe';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailedComponent } from './components/detailed/detailed.component';
import { ApiComponent } from './components/api/api.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterCheckComponent,
    RegisterMainComponent,
    MainComponent,
    AdminMainComponent,
    NavbarComponent,
    CartComponent,
    AllCategoriesComponent,
    ByCategoriesComponent,
    WelcomeComponent,
    CheckoutComponent,
    PersonNamePipe,
    DetailedComponent,
    ApiComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: WebRequestInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
