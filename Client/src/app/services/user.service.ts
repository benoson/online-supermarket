import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import UserRegistrationDetails from '../models/UserRegistrationDetials';
import SuccessfulLoginServerResponse from '../models/SuccessfulLoginServerResponse';
import UserLoginDetails from '../models/UserLoginDetails';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { };

  public register = (userRegistrationDetails: UserRegistrationDetails) : Observable<SuccessfulLoginServerResponse> => {
    return this.http.post<SuccessfulLoginServerResponse>("http://localhost:3001/users/register", userRegistrationDetails);
  }

  public login = (userLoginDetails: UserLoginDetails): Observable<SuccessfulLoginServerResponse> => {
    return this.http.post<SuccessfulLoginServerResponse>("http://localhost:3001/users/login", userLoginDetails);
  }
}
