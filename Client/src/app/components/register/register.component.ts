import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import SuccessfulLoginServerResponse from 'src/app/models/SuccessfulLoginServerResponse';
import UserRegistrationDetails from 'src/app/models/UserRegistrationDetials';
import { UserService } from 'src/app/services/user.service';
import UsersUtils from 'src/app/Utils/UsersUtils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public userRegistrationDetails: UserRegistrationDetails;

  public registrationValues: FormGroup;
  public IDInput: FormControl;
  public emailInput: FormControl;
  public passwordInput: FormControl;
  public verifiedPasswordInput: FormControl;

  constructor(
    private userService: UserService,
    private router: Router
  ) { };

  ngOnInit(): void {
    this.userRegistrationDetails = new UserRegistrationDetails(null, "", "", "", "", "", "", "");
    this.initializeFormControlsValidations();
  }

  public register = (): void => {
    
    this.assignFormControlsValues();

    // Validating all input fields
    try {
      const areAllInputsValid = UsersUtils.validateAllRegistrationFields(this.userRegistrationDetails);
  
      if (areAllInputsValid) {
        const observable = this.userService.register(this.userRegistrationDetails);
  
        observable.subscribe( succesfulServerResponse => {
          UsersUtils.insertUserInfoToSessionStorage(succesfulServerResponse);
          this.handleRoutingAfterLogin(succesfulServerResponse.userType);
  
        }, badServerResponse => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: badServerResponse.error.errorMessage,
            showConfirmButton: false,
            timer: 2500
          });
        });
      }
    }
    catch (error) {
      alert(error.message);
    }
  }

  public handleRoutingAfterLogin = (userType: string): void => {
    if (userType === "ADMIN") {
      this.router.navigate(['/admin']);
    }
    else {
      this.router.navigate(['/customer']);
    }
  }

  public passCheck(c: AbstractControl): {invalid: boolean} {
    if (c.get('this.passwordInput').value !== c.get('this.verifiedPassword').value) {
      return {invalid: true};
    }
  }

  public assignFormControlsValues = (): void => {
    this.userRegistrationDetails.ID = this.IDInput.value;
    this.userRegistrationDetails.email = this.emailInput.value;
    this.userRegistrationDetails.password = this.passwordInput.value;
  }

  public initializeFormControlsValidations = (): void => {
    this.IDInput = new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{9}$')]);
    this.emailInput = new FormControl("", [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{1,3}$'), Validators.maxLength(35)]);
    this.passwordInput = new FormControl("", [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,15}$')]);
    this.verifiedPasswordInput = new FormControl("", [Validators.required]);
    

    this.registrationValues = new FormGroup({
      ID: this.IDInput,
      email: this.emailInput,
      password: this.passwordInput,
      verifiedPassword: this.verifiedPasswordInput
    }, this.passCheck)
  }

}
