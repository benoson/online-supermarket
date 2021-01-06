import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import SuccessfulLoginServerResponse from 'src/app/models/SuccessfulLoginServerResponse';
import UserLoginDetails from 'src/app/models/UserLoginDetails';
import { UserService } from 'src/app/services/user.service';
import ErrorMessages from 'src/app/Utils/ErrorMessages';
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
    private userService: UserService,
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
        UsersUtils.insertUserInfoToSessionStorage(succesfulServerResponse);
        // this.handleRoutingAfterLogin(succesfulServerResponse); -> WHAT TO DO WITH THIS ? DO I NEED THIS? I NEED TO STAY IN THE WELCOME SCREEN...
  
      }, badServerResponse => {
        ErrorMessages.displayErrorPopupMessage(badServerResponse.error.errorMessage);
      })
    }
    catch (error) {
      ErrorMessages.displayErrorPopupMessage(error.message);
    }
  }

  public handleRoutingAfterLogin = (succesfulServerResponse: SuccessfulLoginServerResponse): void => {
    if (succesfulServerResponse.userType === "ADMIN") {
      ErrorMessages.displaySuccessPopupMessage(`Welcome, ${succesfulServerResponse.firstName}, Logged as an Administrator`);
      this.router.navigate(['/admin']);
    }
    else {
      ErrorMessages.displaySuccessPopupMessage(`Welcome, ${succesfulServerResponse.firstName}`);
      // this.router.navigate(['/customer']);
    }
  }

  public assignFormControlsValues = (): void => {
    this.userLoginDetails.email = this.emailInput.value;
    this.userLoginDetails.password = this.passwordInput.value;
  }

  public initializeFormControlsValidations = (): void => {
    this.emailInput = new FormControl("", [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{1,3}$'), Validators.maxLength(35)]);
    this.passwordInput = new FormControl("");

    this.loginValues = new FormGroup({
      email: this.emailInput,
      password: this.passwordInput
    });
  }

}
