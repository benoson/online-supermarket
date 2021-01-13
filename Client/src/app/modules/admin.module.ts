import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '../components/admin/admin.component';
import { AdminSidebarComponent } from '../components/admin-sidebar/admin-sidebar.component';

// Material UI imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatBadgeModule } from '@angular/material/badge';


const routes: Routes = [
  { path: "", component: AdminComponent}
];


@NgModule({
  declarations: [
    AdminComponent,
    AdminSidebarComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatSelectModule,
    MatBadgeModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
