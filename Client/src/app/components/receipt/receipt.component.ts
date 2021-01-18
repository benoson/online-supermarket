import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import CartItemForDisplay from 'src/app/models/CartItemForDisplay';
import Order from 'src/app/models/Order';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';
import OrdersUtils from 'src/app/Utils/OrdersUtils';
import PopupMessages from 'src/app/Utils/PopupMessages';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {

  public orderDetails: Order;

  public currentProductsForDisplay: CartItemForDisplay[];
  public totalPriceOfAllCartItems: number;
  public searchInputValue: string;

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
    this.cartService.customerCurrentCartItemsChange.subscribe((value: CartItemForDisplay[]) => {
      this.currentProductsForDisplay = value;
      this.updateTotalPriceOfAllCartItems();
    });

    this.updateTotalPriceOfAllCartItems();
  }


  // -------------------------------------------------------------------------------- Model

  /**
   * this function attempts to purchase a product for the customer
   */
  public onPurchaseClick = (): void => {
    // assigning the form control values
    this.assignFormControlsValues();

    try {
      // Validating all input fields
      const areAllInputsValid = OrdersUtils.validateOrderDetails(this.orderDetails);

      // if all the receipt inputs are valid
      if (areAllInputsValid) {
        const observable = this.orderService.addNewOrder(this.orderDetails);

        observable.subscribe(() => {
          // after a succesfull purchase
          PopupMessages.displaySuccessPopupMessage("Thank you for purchasing at Bitten Tomato's ! Hope to see you again");
          const emptyCart = new Array<CartItemForDisplay>();
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


  // -------------------------------------------------------------------------------- Controller

  /**
   * initializes the receipt values
   */
  private initializeReceipt = (): void => {
    this.orderDetails = new Order("", "", "", null);
    this.searchInputValue = "";
    this.totalPriceOfAllCartItems = 0;
  }

  /**
   * assignigs form control values of the input fields
   */
  private assignFormControlsValues = (): void => {
    this.orderDetails.creditCardNumber = this.creditCardInput.value;
    this.orderDetails.deliveryCity = this.cityInput.value;
    this.orderDetails.deliveryStreet = this.streetInput.value;
    this.orderDetails.deliveryDate = this.shippingDateInput.value;
  }

  /**
   * updates the total price of all the cart items
   */
  private updateTotalPriceOfAllCartItems = (): void => {
    this.totalPriceOfAllCartItems = 0;

    for (let cartItem of this.currentProductsForDisplay) {
      this.totalPriceOfAllCartItems += +cartItem.totalPrice;
    }

    // limiting the number of decimal places of the total price
    this.totalPriceOfAllCartItems = +this.totalPriceOfAllCartItems.toFixed(2);
  }

  /**
   * initializing the form controls validations
   */
  private initializeFormControlsValidations = (): void => {
    // initializing the form control values and their validators
    this.cityInput = new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(15)]);
    this.streetInput = new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(15)]);
    this.creditCardInput = new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{16}$')]);
    this.shippingDateInput = new FormControl(null, Validators.required);

    // creating a new form group
    this.paymentValues = new FormGroup({
      city: this.cityInput,
      street: this.streetInput,
      payment: this.creditCardInput,
      shippingDate: this.shippingDateInput
    });
  }

  public onDownloadReceiptClicked = () : void => {
    const receiptText = this.getReceiptDetails();
    this.exportTextFile(receiptText);
  }

  private exportTextFile = (receiptText: string): void => {
    const blob = new Blob([receiptText], { type: "text/plain;charset=utf-8" });
    saveAs(blob, new Date() + "-receipt.txt");
  }

  private getReceiptDetails = (): string => {
    let receiptTextLine = "\n";
    for (let item of this.cartService.customerCurrentCartItems) {
      receiptTextLine += `${item.amount} x ${item.productName} ------------- ${item.totalPrice} $\n`;
    }

    receiptTextLine += `\nTotal Cart Price: ${this.totalPriceOfAllCartItems} $\n\n=====THANK YOU FOR YOUR PURCHASE, Bitten Tomato=====`;
    return receiptTextLine;
  }


  // -------------------------------------------------------------------------------- View

  /**
   * closes the receipt
   */
  public closeReceipt = (): void => {
    // updating the 'show receipt' value in the receipt service
    this.cartService.isShowReceiptChange.next(false);
  }
}
