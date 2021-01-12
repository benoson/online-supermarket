import { Component, OnInit } from '@angular/core';
import CartItemForDisplay from 'src/app/models/CartItemForDisplay';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {

  public customerCurrentCartItems : CartItemForDisplay[];

  constructor(private cartService: CartService) {
    this.customerCurrentCartItems = this.cartService.customerCurrentCartItems;
  }

  ngOnInit(): void {
    // listening for changes inside the customer's currect cart creation date, inside the cart service
    this.cartService.customerCurrentCartItemsChange.subscribe( (value: CartItemForDisplay[]) => {
      this.customerCurrentCartItems = value;
    });
  }

}
