// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationInterceptor } from '../interceptor/AuthenticationInterceptor';

// Components
import { LayoutComponent } from '../components/layout/layout.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { WelcomeSectionsComponent } from '../components/welcome-sections/welcome-sections.component';
import { AboutUsSectionComponent } from '../components/about-us-section/about-us-section.component';
import { ShopInfoSectionComponent } from '../components/shop-info-section/shop-info-section.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { CustomerComponent } from '../components/customer/customer.component';

// Pipes
import { ProductsPipe } from '../pipes/products.pipe';


// Sweet Alert
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

// Material UI imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { ProductComponent } from '../components/product/product.component';
import { MyCartComponent } from '../components/my-cart/my-cart.component';
import { MatSelectModule } from '@angular/material/select';
import { MatBadgeModule } from '@angular/material/badge';


@NgModule({
  declarations: [
    LayoutComponent,
    LoginComponent,
    WelcomeSectionsComponent,
    AboutUsSectionComponent,
    ShopInfoSectionComponent,
    NavbarComponent,
    RegisterComponent,
    PageNotFoundComponent,
    CustomerComponent,
    ProductComponent,
    ProductsPipe,
    MyCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatSelectModule,
    MatBadgeModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }
  ],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
