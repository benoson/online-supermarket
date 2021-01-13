import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import CartItemForDisplay from 'src/app/models/CartItemForDisplay';
import Order from 'src/app/models/Order';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';
import OrdersUtils from 'src/app/Utils/OrdersUtils';
import PopupMessages from 'src/app/Utils/PopupMessages';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {

  public orderDetails : Order;

  public currentProductsForDisplay: CartItemForDisplay[];
  public totalPriceOfAllCartItems : number;
  public searchInputValue : string;

  public paymentValues: FormGroup;
  public cityInput: FormControl;
  public streetInput: FormControl;
  public creditCardInput: FormControl;
  public shippingDateInput: FormControl;

  constructor(
    private cartService: CartService,
    private orderService: OrdersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentProductsForDisplay = this.cartService.customerCurrentCartItems;
    this.initializeReceipt();
    this.initializeFormControlsValidations();

    // listening for changes inside the customer's currect cart items, inside the cart service
    this.cartService.customerCurrentCartItemsChange.subscribe( (value: CartItemForDisplay[]) => {
      this.currentProductsForDisplay = value;
      this.updateTotalPriceOfAllCartItems();
    });

    this.updateTotalPriceOfAllCartItems();
  }

  private initializeReceipt = () => {
    this.orderDetails = new Order("", "", "", null);
    this.searchInputValue = "";
    this.totalPriceOfAllCartItems = 0;
  }
  
  public onPurchaseClick = () => {
    this.assignFormControlsValues();

    try {
      // Validating all input fields
      const areAllInputsValid = OrdersUtils.validateOrderDetails(this.orderDetails);
  
      if (areAllInputsValid) {
        const observable = this.orderService.addNewOrder(this.orderDetails);
  
        observable.subscribe( () => {
          PopupMessages.displaySuccessPopupMessage("Thank you for purchasing at Bitten Tomato's ! Hope to see you again");
          const emptyCart = new Array <CartItemForDisplay>();
          this.cartService.customerCurrentCartItemsChange.next(emptyCart);
          this.router.navigate(['/welcome/login']);
  
        }, badServerResponse => {
          PopupMessages.displayErrorPopupMessage(badServerResponse.error.errorMessage);
        });
      }
    }
    catch (error) {
      PopupMessages.displayErrorPopupMessage(error);
    }
  }

  public closeReceipt = () => {
    this.cartService.isShowReceiptChange.next(false);
  }

  private assignFormControlsValues = (): void => {
    this.orderDetails.creditCardNumber = this.creditCardInput.value;
    this.orderDetails.deliveryCity = this.cityInput.value;
    this.orderDetails.deliveryStreet = this.streetInput.value;
    this.orderDetails.deliveryDate = this.shippingDateInput.value;
  }
  
  private updateTotalPriceOfAllCartItems = () => {
    this.totalPriceOfAllCartItems = 0;

    for (let cartItem of this.currentProductsForDisplay) {
      this.totalPriceOfAllCartItems += +cartItem.totalPrice;
    }

    // limiting the number of decimal places of the total price
    this.totalPriceOfAllCartItems = +this.totalPriceOfAllCartItems.toFixed(2);
  }

  private initializeFormControlsValidations = (): void => {
    this.cityInput = new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(15)]);
    this.streetInput = new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(15)]);
    this.creditCardInput = new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{16}$')]);
    this.shippingDateInput = new FormControl(null, Validators.required);

    this.paymentValues = new FormGroup({
      city: this.cityInput,
      street: this.streetInput,
      payment: this.creditCardInput,
      shippingDate: this.shippingDateInput
    });
  }
}
