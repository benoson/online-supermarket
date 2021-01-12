import { Component, OnInit } from '@angular/core';
import CartItemForDisplay from 'src/app/models/CartItemForDisplay';
import { CartService } from 'src/app/services/cart.service';
import PopupMessages from 'src/app/Utils/PopupMessages';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {

  public customerCurrentCartItems : CartItemForDisplay[];
  public searchInputValue : string;
  public totalPriceOfAllCartItems : number;

  constructor(private cartService: CartService) {
    this.customerCurrentCartItems = this.cartService.customerCurrentCartItems;
  }

  ngOnInit(): void {
    this.searchInputValue = "";
    this.checkIfCartHasItems();
    
    // listening for changes inside the customer's currect cart items, inside the cart service
    this.cartService.customerCurrentCartItemsChange.subscribe( (value: CartItemForDisplay[]) => {
      this.customerCurrentCartItems = value;
      this.updateTotalPriceOfAllCartItems();
    });

    this.updateTotalPriceOfAllCartItems();
  }

  public purchaseCartItems = () => {
    this.cartService.isShowReceiptChange.next(true);
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

    // if the cart is empty, close the receipt
    if (this.cartService.customerCurrentCartItems.length === 0) {
      this.cartService.isShowReceiptChange.next(false);
    }
  }

  public removeAllCartItems = () => {
    const observable = this.cartService.removeAllCartItems();

    observable.subscribe( () => {
      this.removeAllItemsFromLocalCart();
      // closing the receipt, if it's open
      this.cartService.isShowReceiptChange.next(false);
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

  private updateTotalPriceOfAllCartItems = () => {
    this.totalPriceOfAllCartItems = 0;

    for (let cartItem of this.customerCurrentCartItems) {
      this.totalPriceOfAllCartItems += +cartItem.totalPrice;
    }

    // limiting the number of decimal places of the total price
    this.totalPriceOfAllCartItems = +this.totalPriceOfAllCartItems.toFixed(2);
  }
}
