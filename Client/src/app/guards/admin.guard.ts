import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import PopupMessages from '../Utils/PopupMessages';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  public constructor(
    private router: Router,
    private userService: UserService
    ) { };

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

    if (userInfo !== null) {
      const userType = userInfo.userType;

      // if the user is logged in, and he is a customer
      if (this.userService.isUserLoggedIn && userType === "ADMIN") {
        PopupMessages.displaySuccessPopupMessage('Welcome, Admin !');
        return true;
      }
    }

    // in case the user is not logged in, or, not a customer, throw him to the `welcome` page in order for him to login again
    this.router.navigateByUrl('/welcome/login');
    PopupMessages.displayErrorPopupMessage('You are not authorized to go there');
    return false;
  }
  
}
