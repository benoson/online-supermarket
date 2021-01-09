import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import PopupMessages from '../Utils/PopupMessages';
import UsersUtils from '../Utils/UsersUtils';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanActivate {

  public constructor(private router:Router) { };

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    const userType = userInfo.userType;

      if (UsersUtils.isUserLoggedIn() && userType === "CUSTOMER") {
        PopupMessages.displaySuccessPopupMessage('Welcome !');
        return true;
      }

      this.router.navigateByUrl('/welcome/login');
      PopupMessages.displayErrorPopupMessage('Please log in first');
      return false;
  }
  
}
