import { Component, OnInit } from '@angular/core';
import CartItemForDisplay from 'src/app/models/CartItemForDisplay';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {

  public currentProductsForDisplay: CartItemForDisplay[];
  public totalPriceOfAllCartItems : number;
  public searchInputValue : string;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.searchInputValue = "";
    this.totalPriceOfAllCartItems = 0;
    this.currentProductsForDisplay = this.cartService.customerCurrentCartItems;

    // listening for changes inside the customer's currect cart items, inside the cart service
    this.cartService.customerCurrentCartItemsChange.subscribe( (value: CartItemForDisplay[]) => {
      this.currentProductsForDisplay = value;
      this.updateTotalPriceOfAllCartItems();
    });

    this.updateTotalPriceOfAllCartItems();
  }

  public closeReceipt = () => {
    this.cartService.isShowReceiptChange.next(false);
  }

  private updateTotalPriceOfAllCartItems = () => {
    this.totalPriceOfAllCartItems = 0;

    for (let cartItem of this.currentProductsForDisplay) {
      this.totalPriceOfAllCartItems += +cartItem.totalPrice;
    }

    // limiting the number of decimal places of the total price
    this.totalPriceOfAllCartItems = +this.totalPriceOfAllCartItems.toFixed(2);
  }
}
