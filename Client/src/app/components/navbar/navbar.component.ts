import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public userFirstName: string;

  constructor() { }

  ngOnInit(): void {
    this.displayUserFirstName();
  }

  private displayUserFirstName = () => {
    const userFirstNameFromSessionStorage = JSON.parse(sessionStorage.getItem('userInfo'));
    if (userFirstNameFromSessionStorage !== null) {
      this.userFirstName = userFirstNameFromSessionStorage.firstName;
    }
  }
}
