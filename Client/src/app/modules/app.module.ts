import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from '../components/layout/layout.component';
import { LoginComponent } from '../components/login/login.component';

// Material UI imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { WelcomeSectionsComponent } from '../components/welcome-sections/welcome-sections.component';
import { AboutUsSectionComponent } from '../components/about-us-section/about-us-section.component';
import { ShopInfoSectionComponent } from '../components/shop-info-section/shop-info-section.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { RegisterComponent } from '../components/register/register.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    LayoutComponent,
    LoginComponent,
    WelcomeSectionsComponent,
    AboutUsSectionComponent,
    ShopInfoSectionComponent,
    NavbarComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
