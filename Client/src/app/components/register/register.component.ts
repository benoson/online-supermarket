import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import SuccessfulLoginServerResponse from 'src/app/models/SuccessfulLoginServerResponse';
import UserRegistrationDetails from 'src/app/models/UserRegistrationDetials';
import { UserService } from 'src/app/services/user.service';
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

    // NEED TO SOLVE PROBLEM - NEED TO INSERT EMPTY VALUE TO THE 'ID' INPUT, BUT HE DEMENDS A NUMBER................
    
    this.userRegistrationDetails = new UserRegistrationDetails(111111111, "", "", "", "", "", "", "");
  }

  public register = (): void => {
    const observable = this.userService.register(this.userRegistrationDetails);

    observable.subscribe( succesfulServerResponse => {
      const userToken = succesfulServerResponse.token;
      const userType = succesfulServerResponse.userType;
      const firstName = succesfulServerResponse.firstName;
      const userInfoFromServer = new SuccessfulLoginServerResponse(userToken, userType, firstName);

      // inserting the user's info to the sessionStorage
      sessionStorage.setItem('userInfo', JSON.stringify(userInfoFromServer));
      this.handleRoutingAfterLogin(userType);

    }, error => {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: error.message,
        showConfirmButton: false,
        timer: 2500
      })
    });
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
