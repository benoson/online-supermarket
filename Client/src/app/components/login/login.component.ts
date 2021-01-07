import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import SuccessfulLoginServerResponse from 'src/app/models/SuccessfulLoginServerResponse';
import UserLoginDetails from 'src/app/models/UserLoginDetails';
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

  // getting the HTML from here, in order to clear it after a submission
  @ViewChild('loginForm')
  loginForm: FormGroupDirective;

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
        PopupMessages.displaySuccessPopupMessage("logged in succesfully!");
        this.clearFormInputs();

        // changing the first name property in the service
        this.userService.userFirstNameChange.next(succesfulServerResponse.firstName);

        // this.handleRoutingAfterLogin(succesfulServerResponse); -> WHAT TO DO WITH THIS ? DO I NEED THIS? I NEED TO STAY IN THE WELCOME SCREEN...
  
      }, badServerResponse => {
        PopupMessages.displayErrorPopupMessage(badServerResponse.error.errorMessage);
      })
    }
    catch (error) {
      PopupMessages.displayErrorPopupMessage(error.message);
    }
  }

  private handleRoutingAfterLogin = (succesfulServerResponse: SuccessfulLoginServerResponse): void => {
    if (succesfulServerResponse.userType === "ADMIN") {
      PopupMessages.displaySuccessPopupMessage(`Welcome, ${succesfulServerResponse.firstName}, Logged as an Administrator`);
      this.router.navigate(['/admin']);
    }
    else {
      PopupMessages.displaySuccessPopupMessage(`Welcome, ${succesfulServerResponse.firstName}`);
      // this.router.navigate(['/customer']);
    }
  }

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
