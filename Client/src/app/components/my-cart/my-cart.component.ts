import { Component, OnInit } from '@angular/core';
import CartItemForDisplay from 'src/app/models/CartItemForDisplay';
import { CartService } from 'src/app/services/cart.service';
import PopupMessages from 'src/app/Utils/PopupMessages';

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
    this.checkIfCartHasItems();
    // listening for changes inside the customer's currect cart creation date, inside the cart service
    this.cartService.customerCurrentCartItemsChange.subscribe( (value: CartItemForDisplay[]) => {
      this.customerCurrentCartItems = value;
    });
  }

  public removeItemFromCart = (cartItem: CartItemForDisplay) => {
    const cartItemID = cartItem.productID;
    const observable = this.cartService.removeItemFromCart(cartItemID);

    observable.subscribe( () => {
      this.removeCartItemFromLocalCart(cartItem);
      PopupMessages.displaySuccessPopupMessage(`${cartItem.productName} was succesfully removed from cart`);

    }, badServerResponse => {
      PopupMessages.displayErrorPopupMessage(badServerResponse.error.errorMessage);
    });
  }

  private removeCartItemFromLocalCart = (cartItem: CartItemForDisplay) => {
    const updatedCartItems = this.customerCurrentCartItems.filter( (item: CartItemForDisplay) => item !== cartItem)
    this.cartService.customerCurrentCartItemsChange.next(updatedCartItems);
  }

  public removeAllCartItems = () => {
    const observable = this.cartService.removeAllCartItems();

    observable.subscribe( () => {
      this.removeAllItemsFromLocalCart();
      PopupMessages.displaySuccessPopupMessage("All items were succesfully removed from cart");

    }, badServerResponse => {
      PopupMessages.displayErrorPopupMessage(badServerResponse.error.errorMessage);
    });
  }

  private removeAllItemsFromLocalCart = () => {
    const updatedCartItems = new Array<CartItemForDisplay>();
    this.cartService.customerCurrentCartItemsChange.next(updatedCartItems);
  }

  private checkIfCartHasItems = () => {
    if (this.cartService.customerCurrentCartItems !== undefined) {
      this.customerCurrentCartItems = this.cartService.customerCurrentCartItems;
    }
    else {
      this.customerCurrentCartItems = new Array<CartItemForDisplay>();
    }
  }
}
