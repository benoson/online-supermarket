import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import SuccessfulLoginServerResponse from 'src/app/models/SuccessfulLoginServerResponse';
import UserLoginDetails from 'src/app/models/UserLoginDetails';
import { OrdersService } from 'src/app/services/orders.service';
import { UserService } from 'src/app/services/user.service';
import PopupMessages from 'src/app/Utils/PopupMessages';
import UsersUtils from 'src/app/Utils/UsersUtils';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userLoginDetails: UserLoginDetails;

  public loginValues: FormGroup;
  public emailInput: FormControl;
  public passwordInput: FormControl;

  constructor(
    public userService: UserService,
    private ordersService: OrdersService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.userLoginDetails = new UserLoginDetails("", "");
    this.initializeFormControlsValidations();
  }

  public login = (): void => {

    this.assignFormControlsValues();

    try {
      UsersUtils.validateUserEmail(this.userLoginDetails.email);
      UsersUtils.validateSinglePassword(this.userLoginDetails.password);
  
      const observable = this.userService.login(this.userLoginDetails);
  
      observable.subscribe( succesfulServerResponse => {
        this.handleSuccesfulLoginResponse(succesfulServerResponse);

      }, badServerResponse => {
        PopupMessages.displayErrorPopupMessage(badServerResponse.error.errorMessage);
        this.userService.isLoggedInChange.next(true);
      })
    }
    catch (error) {
      PopupMessages.displayErrorPopupMessage(error.message);
    }
  }


  /**
   * 
   * @param succesfulServerResponse - handles a succesfull login response from the server
   */
  private handleSuccesfulLoginResponse = (succesfulServerResponse: SuccessfulLoginServerResponse): void => {

    UsersUtils.insertUserInfoToSessionStorage(succesfulServerResponse);
    PopupMessages.displaySuccessPopupMessage("logged in succesfully!");
    this.clearFormInputs();
    // updating the users service that the user has logged in
    this.userService.isLoggedInChange.next(true);
    this.getLastOrderDateByCustomer();
    // changing the first name property in the service
    this.userService.userFirstNameChange.next(succesfulServerResponse.firstName);
  }

  private getLastOrderDateByCustomer = (): void => {
    const observable = this.ordersService.getLastOrderDateByCustomer();

    observable.subscribe( (succesfulServerResponse: string | null) => {
      this.ordersService.customerLastOrderDateChange.next(succesfulServerResponse);

    }, badServerResponse => {
      PopupMessages.displayErrorPopupMessage(badServerResponse.error.errorMessage);
    });
  };

  private assignFormControlsValues = (): void => {
    this.userLoginDetails.email = this.emailInput.value;
    this.userLoginDetails.password = this.passwordInput.value;
  }

  private initializeFormControlsValidations = (): void => {
    this.emailInput = new FormControl("", [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{1,3}$'), Validators.maxLength(35)]);
    this.passwordInput = new FormControl("");

    this.loginValues = new FormGroup({
      email: this.emailInput,
      password: this.passwordInput
    });
  }

  /**
   * clears the form's inputs and `login` button validation
   */
  private clearFormInputs = () => {
    this.emailInput.setValue("");
    this.passwordInput.setValue("");
  }

}
