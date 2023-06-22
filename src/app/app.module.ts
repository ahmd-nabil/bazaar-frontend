import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainComponent } from './components/main/main.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { ProductsComponent } from './components/products/products.component';
import { FooterComponent } from './components/footer/footer.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutFormComponent } from './components/checkout-form/checkout-form.component';
import { LoginComponent } from './components/login/login.component';

import { OktaAuthModule } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import oktaConfig from './config/okta-config';
import { LoginStatusComponent } from './components/navbar/login-status/login-status.component';



const oktaAuth = new OktaAuth(oktaConfig.oidc);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainComponent,
    CategoriesListComponent,
    ProductsComponent,
    FooterComponent,
    PaginationComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutFormComponent,
    LoginComponent,
    LoginStatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    BrowserAnimationsModule,
    ClipboardModule,
    ReactiveFormsModule,
    OktaAuthModule.forRoot({ oktaAuth })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
