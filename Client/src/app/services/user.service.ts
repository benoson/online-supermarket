import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import UserRegistrationDetails from '../models/UserRegistrationDetials';
import SuccessfulLoginServerResponse from '../models/SuccessfulLoginServerResponse';
import UserLoginDetails from '../models/UserLoginDetails';
import UsersUtils from '../Utils/UsersUtils';
import PopupMessages from '../Utils/PopupMessages';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userFirstName: string;
  public userFirstNameChange: Subject<string> = new Subject<string>();

  public isUserLoggedIn: boolean;
  public isLoggedInChange: Subject<boolean> = new Subject<boolean>();

  public userTypeFromServer: string;
  public userTypeFromServerChange: Subject<string> = new Subject<string>();


  constructor(private http: HttpClient) {
    this.isUserLoggedIn = UsersUtils.isUserLoggedIn();
    this.userFirstName = UsersUtils.getFirstName();
    this.initializeListeners();
    this.getUserType();
  };

  /**
   * initializes the service's listeners
   */
  public initializeListeners = () => {
    // listening for changes in the first name, and updating accordingly
    this.userFirstNameChange.subscribe((value: string) => {
      this.userFirstName = value;
    });

    // listening for changes in the user type from the server, and updating accordingly
    this.userTypeFromServerChange.subscribe((value: string) => {
      this.userTypeFromServer = value;
    });

    // listening for changes in the 'is logged in' state, and updating accordingly
    this.isLoggedInChange.subscribe((value: boolean) => {
      this.isUserLoggedIn = value;
    });
  }

  /**
   * gets the current user's type
   */
  private getUserType = () => {
    if (this.isUserLoggedIn) {
      const observable = this.getUserTypeFromServer();
      try {
        observable.subscribe(succesfulServerResponse => {
          this.userTypeFromServerChange.next(succesfulServerResponse);

        }, badServerResponse => {
          PopupMessages.displayErrorPopupMessage(badServerResponse.error.errorMessage);
        })
      }
      catch (error) {
        PopupMessages.displayErrorPopupMessage(error.message);
      }
    }
  }

  /**
   * 
   * @param userRegistrationDetails - registers a customer
   */
  public register = (userRegistrationDetails: UserRegistrationDetails): Observable<SuccessfulLoginServerResponse> => {
    return this.http.post<SuccessfulLoginServerResponse>("http://localhost:3001/users/register", userRegistrationDetails);
  }

  /**
   * 
   * @param userLoginDetails - logs in a user
   */
  public login = (userLoginDetails: UserLoginDetails): Observable<SuccessfulLoginServerResponse> => {
    return this.http.post<SuccessfulLoginServerResponse>("http://localhost:3001/users/login", userLoginDetails);
  }

  /**
   * logs out a user
   */
  public logout = (): Observable<any> => {
    return this.http.post("http://localhost:3001/users/logout", {});
  }

  /**
   * gets the user type from the server
   */
  public getUserTypeFromServer = (): Observable<string> => {
    return this.http.get<string>("http://localhost:3001/users/type");
  }
}
