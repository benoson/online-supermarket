import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import PopupMessages from 'src/app/Utils/PopupMessages';
import UsersUtils from 'src/app/Utils/UsersUtils';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public userFirstName: string;

  constructor(
    private userService: UserService
  ) { };

  ngOnInit(): void {

    this.userFirstName = this.userService.userFirstName;

    // listening for changes of the first name, inside the users service
    this.userService.userFirstNameChange.subscribe( (value: string) => {
      this.userFirstName = value;
    });
  }

  public logout = () => {
    const observable = this.userService.logout();
  
    observable.subscribe( () => {
      UsersUtils.handleSuccesfulLogout();
      this.userService.userFirstNameChange.next(null);
      this.userService.isLoggedInChange.next(false);
    }, badServerResponse => {
      PopupMessages.displayErrorPopupMessage(badServerResponse.error.errorMessage);
    });
  }
}
