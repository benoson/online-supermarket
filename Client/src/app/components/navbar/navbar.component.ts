import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public userFirstName: string;

  constructor(
    private userService: UserService
  ) { };

  ngOnInit(): void {
    // listening for changes of the first name, inside the users service
    this.userService.userFirstNameChange.subscribe( (value: string) => {
      this.userFirstName = value;
    });

    this.displayUserFirstName();
  }

  private displayUserFirstName = () => {
    const userFirstNameFromLocalStorage = JSON.parse(sessionStorage.getItem('userInfo'));
    if (userFirstNameFromLocalStorage !== null) {
      this.userFirstName = userFirstNameFromLocalStorage.firstName;
    }
  }

}
