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

  public customerCurrentCartItems: CartItemForDisplay[];
  public searchInputValue: string;
  public totalPriceOfAllCartItems: number;

  constructor(private cartService: CartService) {
    this.customerCurrentCartItems = this.cartService.customerCurrentCartItems;
  }

  ngOnInit(): void {
    this.initiateComponent();
  }


  // -------------------------------------------------------------------------------- Model

  /**
   * 
   * @param cartItem attempts to remove a cart item from the user's cart, in the server
   */
  public removeItemFromCart = (cartItem: CartItemForDisplay): void => {
    const cartItemID = cartItem.productID;
    const observable = this.cartService.removeItemFromCart(cartItemID);

    observable.subscribe(() => {
      this.removeCartItemFromLocalCart(cartItem);
      PopupMessages.displaySuccessPopupMessage(`${cartItem.productName} was succesfully removed from cart`);

    }, badServerResponse => {
      PopupMessages.displayErrorPopupMessage(badServerResponse.error.errorMessage);
    });
  }

  /**
   * attemps to remove all cart items from thhe user's cart, in the server
   */
  public removeAllCartItems = (): void => {
    const observable = this.cartService.removeAllCartItems();

    observable.subscribe(() => {
      this.removeAllItemsFromLocalCart();
      // closing the receipt, if it's open
      this.cartService.isShowReceiptChange.next(false);
      PopupMessages.displaySuccessPopupMessage("All items were succesfully removed from cart");

    }, badServerResponse => {
      PopupMessages.displayErrorPopupMessage(badServerResponse.error.errorMessage);
    });
  }

  // -------------------------------------------------------------------------------- Controller

  /**
   * initiates the component definitions and listeners
   */
  private initiateComponent = (): void => {
    this.searchInputValue = "";
    this.checkIfCartHasItems();

    // listening for changes inside the customer's currect cart items, inside the cart service
    this.cartService.customerCurrentCartItemsChange.subscribe((value: CartItemForDisplay[]) => {
      this.customerCurrentCartItems = value;
      this.updateTotalPriceOfAllCartItems();
    });

    this.updateTotalPriceOfAllCartItems();
  }

  /**
   * displays the receipt
   */
  public purchaseCartItems = (): void => {
    this.cartService.isShowReceiptChange.next(true);
  }

  /**
   * 
   * @param cartItem removes a cart item from the local cart
   */
  private removeCartItemFromLocalCart = (cartItem: CartItemForDisplay): void => {
    // filtering the cart items, without the removed item
    const updatedCartItems = this.customerCurrentCartItems.filter((item: CartItemForDisplay) => item !== cartItem)
    this.cartService.customerCurrentCartItemsChange.next(updatedCartItems);

    // if the cart is empty, close the receipt
    if (this.cartService.customerCurrentCartItems.length === 0) {
      this.cartService.isShowReceiptChange.next(false);
    }
  }

  /**
   * removes all cart items from the local cart
   */
  private removeAllItemsFromLocalCart = (): void => {
    // clears the customer's cart locally
    const updatedCartItems = new Array<CartItemForDisplay>();
    this.cartService.customerCurrentCartItemsChange.next(updatedCartItems);
  }

  /**
   * checks if the user's cart has items in it
   */
  private checkIfCartHasItems = (): void => {
    if (this.cartService.customerCurrentCartItems !== undefined) {
      this.customerCurrentCartItems = this.cartService.customerCurrentCartItems;
    }
    else {
      this.customerCurrentCartItems = new Array<CartItemForDisplay>();
    }
  }

  /**
   * updates the total price of all the user's cart items
   */
  private updateTotalPriceOfAllCartItems = (): void => {
    // calculating the total price of all the cart items
    this.totalPriceOfAllCartItems = 0;
    for (let cartItem of this.customerCurrentCartItems) {
      this.totalPriceOfAllCartItems += +cartItem.totalPrice;
    }
    // limiting the number of decimal places of the total price
    this.totalPriceOfAllCartItems = +this.totalPriceOfAllCartItems.toFixed(2);
  }

}
