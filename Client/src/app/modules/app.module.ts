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
<<<<<<< HEAD
import { WelcomeSectionsComponent } from '../components/welcome-sections/welcome-sections.component';
import { AboutUsSectionComponent } from '../components/about-us-section/about-us-section.component';
import { ShopInfoSectionComponent } from '../components/shop-info-section/shop-info-section.component';
=======
import { AboutUsSectionComponent } from '../components/about-us-section/about-us-section.component';
import { ShopInfoSectionComponent } from '../components/shop-info-section/shop-info-section.component';
import { WelcomeSectionsComponent } from '../components/welcome-sections/welcome-sections.component';
>>>>>>> ben/b1

@NgModule({
  declarations: [
    LayoutComponent,
    LoginComponent,
<<<<<<< HEAD
    WelcomeSectionsComponent,
    AboutUsSectionComponent,
    ShopInfoSectionComponent
=======
    AboutUsSectionComponent,
    ShopInfoSectionComponent,
    WelcomeSectionsComponent
>>>>>>> ben/b1
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
