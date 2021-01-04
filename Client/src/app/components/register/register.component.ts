import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  public firstNameInput: FormControl;
  public lastNameInput: FormControl;
  public cityInput: FormControl;
  public streetInput: FormControl;

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

  public assignFormControlsValues = (): void => {
    this.userRegistrationDetails.ID = this.IDInput.value;
    this.userRegistrationDetails.email = this.emailInput.value;
    this.userRegistrationDetails.password = this.passwordInput.value;
    this.userRegistrationDetails.verifiedPassword = this.verifiedPasswordInput.value;
    this.userRegistrationDetails.firstName = this.firstNameInput.value;
    this.userRegistrationDetails.lastName = this.lastNameInput.value;
    this.userRegistrationDetails.city = this.cityInput.value;
    this.userRegistrationDetails.street = this.streetInput.value;
  }

  public initializeFormControlsValidations = (): void => {
    this.IDInput = new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{9}$')]);
    this.emailInput = new FormControl("", [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{1,3}$'), Validators.maxLength(35)]);
    this.passwordInput = new FormControl("", [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,15}$')]);
    this.verifiedPasswordInput = new FormControl("", [Validators.required]);
    this.firstNameInput = new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(15)]);
    this.lastNameInput = new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(15)]);
    this.cityInput = new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(15)])
    this.streetInput = new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(15)])
    

    this.registrationValues = new FormGroup({
      ID: this.IDInput,
      email: this.emailInput,
      password: this.passwordInput,
      verifiedPassword: this.verifiedPasswordInput,
      firstName: this.firstNameInput,
      lastName: this.lastNameInput,
      city: this.cityInput,
      street: this.streetInput
    });
  }

}
