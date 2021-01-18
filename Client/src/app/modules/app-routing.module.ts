// Angular built-ins
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { WelcomeSectionsComponent } from '../components/welcome-sections/welcome-sections.component';
import { CustomerComponent } from '../components/customer/customer.component';
import { LoginComponent } from '../components/login/login.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { RegisterComponent } from '../components/register/register.component';

// Guards
import { AdminGuard } from '../guards/admin.guard';
import { CustomerGuard } from '../guards/customer.guard';



const routes: Routes = [
  {path:'', redirectTo: '/welcome/login', pathMatch: 'full'},

  {path:'admin', canActivate: [AdminGuard], loadChildren: './admin.module#AdminModule'},

  {path:'welcome', component: WelcomeSectionsComponent, children: [
    {path:'', redirectTo: '/welcome/login', pathMatch: 'full'},
    {path:'register', component: RegisterComponent},
    {path:'login', component: LoginComponent},
  ]},

  {path:'customer', canActivate: [CustomerGuard], component: CustomerComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
