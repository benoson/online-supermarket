import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import SuccessfulLoginServerResponse from 'src/app/models/SuccessfulLoginServerResponse';
import UserLoginDetails from 'src/app/models/UserLoginDetails';
import { UserService } from 'src/app/services/user.service';
import UsersUtils from 'src/app/Utils/UsersUtils';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userLoginDetails: UserLoginDetails;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.userLoginDetails = new UserLoginDetails("", "");
  }

  public login = (): void => {
    const observable = this.userService.login(this.userLoginDetails);

    observable.subscribe( succesfulServerResponse => {
      UsersUtils.insertUserInfoToSessionStorage(succesfulServerResponse);
      this.handleRoutingAfterLogin(succesfulServerResponse);

    }, badServerResponse => {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: badServerResponse.error.errorMessage,
        showConfirmButton: false,
        timer: 2500
      });
    })
  }

  public handleRoutingAfterLogin = (succesfulServerResponse: SuccessfulLoginServerResponse): void => {
    if (succesfulServerResponse.userType === "ADMIN") {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Welcome, ${succesfulServerResponse.firstName}, Logged as an Administrator`,
        showConfirmButton: false,
        timer: 2500
      });
      this.router.navigate(['/admin']);
    }
    else {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Welcome, ${succesfulServerResponse.firstName}`,
        showConfirmButton: false,
        timer: 2500
      });
      // this.router.navigate(['/customer']);
    }
  }

}
