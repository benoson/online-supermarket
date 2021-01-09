import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import UserRegistrationDetails from '../models/UserRegistrationDetials';
import SuccessfulLoginServerResponse from '../models/SuccessfulLoginServerResponse';
import UserLoginDetails from '../models/UserLoginDetails';
import UsersUtils from '../Utils/UsersUtils';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userFirstName: string;
  public userFirstNameChange: Subject<string> = new Subject<string>();

  public isUserLoggedIn: boolean;
  public isLoggedInChange: Subject<boolean> = new Subject<boolean>();


  constructor(private http: HttpClient) {

    this.isUserLoggedIn = UsersUtils.isUserLoggedIn();
    console.log(this.isUserLoggedIn);

    // listening for changes in the first name, and updating accordingly
    this.userFirstNameChange.subscribe( (value: string) => {
      this.userFirstName = value;
    });

    // listening for changes in the 'is logged in' state, and updating accordingly
    this.isLoggedInChange.subscribe( (value: boolean) => {
      this.isUserLoggedIn = value;
    });
  };


  public register = (userRegistrationDetails: UserRegistrationDetails) : Observable<SuccessfulLoginServerResponse> => {
    return this.http.post<SuccessfulLoginServerResponse>("http://localhost:3001/users/register", userRegistrationDetails);
  }

  public login = (userLoginDetails: UserLoginDetails): Observable<SuccessfulLoginServerResponse> => {
    return this.http.post<SuccessfulLoginServerResponse>("http://localhost:3001/users/login", userLoginDetails);
  }
}
