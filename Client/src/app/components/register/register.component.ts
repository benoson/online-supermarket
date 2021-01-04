import { Component, OnInit } from '@angular/core';
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

  constructor(
    private userService: UserService,
    private router: Router
  ) { };

  ngOnInit(): void {
    this.userRegistrationDetails = new UserRegistrationDetails(null, "", "", "", "", "", "", "");
  }

  public register = (): void => {
    
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

}
