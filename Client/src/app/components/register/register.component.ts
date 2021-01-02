import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import SuccessfulLoginServerResponse from 'src/app/models/SuccessfulLoginServerResponse';
import UserRegistrationDetails from 'src/app/models/UserRegistrationDetials';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private userRegistrationDetails: UserRegistrationDetails;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
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
      this.handleRoutingAfterLogin(succesfulServerResponse);

    }, error => {
      // MAKE POPUP MESSAGE (MAYBE MUI............)
    });
  }

  public handleRoutingAfterLogin = (succesfulServerResponse: SuccessfulLoginServerResponse): void => {
    if (succesfulServerResponse.userType === "ADMIN") {
      this.router.navigate(['/admin']);
    }
    else {
      this.router.navigate(['/customer']);
    }
  }

}
