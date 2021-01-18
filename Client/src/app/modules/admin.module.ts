// Angular built-ins
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { AdminComponent } from '../components/admin/admin.component';
import { AdminSidebarComponent } from '../components/admin-sidebar/admin-sidebar.component';

// Sweet Alert
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

// Material UI imports
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
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatSelectModule,
    MatBadgeModule,
    SweetAlert2Module.forRoot(),
    RouterModule.forChild(routes)
  ],
})
export class AdminModule { }
