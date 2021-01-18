import { Component, OnInit } from '@angular/core';
import CartItem from 'src/app/models/CartItem';
import CartItemForDisplay from 'src/app/models/CartItemForDisplay';
import Product from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';
import PopupMessages from 'src/app/Utils/PopupMessages';

@Component({
  selector: 'app-shop-info-section',
  templateUrl: './shop-info-section.component.html',
  styleUrls: ['./shop-info-section.component.css']
})
export class ShopInfoSectionComponent implements OnInit {

  public totalProductsAmount: number;
  public totalOrdersAmount: number;
  public customerLastOrderDate: string;
  public customerCurrentCartItems: CartItem[];
  public currentCartCreationDate: string | null;

  constructor(
    private productsService: ProductsService,
    private ordersService: OrdersService,
    public userService: UserService,
    private cartService: CartService
  ) { };


  ngOnInit(): void {
    this.initiateListeners();
    this.getLastOrderDateByCustomer();
    this.getTotalOrdersAmount();
    this.getCustomerCurrentCartItems();
    this.getCustomerCurrentCartCreationDate();
  }


  // -------------------------------------------------------------------------------- Model

  /**
 * attemps to get the customer's current cart items
 */
  private getCustomerCurrentCartItems = (): void => {

    // if the customer is currently logged in
    if (this.userService.isUserLoggedIn) {
      const observable = this.cartService.getCurrentCartItems();

      observable.subscribe((succesfulServerResponse: CartItemForDisplay[]) => {
        // updating the cart service with the cart items that were received from the server
        this.cartService.customerCurrentCartItemsChange.next(succesfulServerResponse);

      }, badServerResponse => {
        PopupMessages.displayErrorPopupMessage(badServerResponse.error.errorMessage);
      });
    }
  }

  /**
   * attemps to get the customer's current cart creation date
   */
  private getCustomerCurrentCartCreationDate = (): void => {

    // if the customer is currently logged in
    if (this.userService.isUserLoggedIn) {
      const observable = this.cartService.getCustomerCurrentCartCreationDate();

      observable.subscribe((succesfulServerResponse: string | null) => {
        // updates the current cart creation date, with the data that was received from the server, in the cart service
        this.cartService.currentCartCreationDateChange.next(succesfulServerResponse);

      }, badServerResponse => {
        PopupMessages.displayErrorPopupMessage(badServerResponse.error.errorMessage);
      });
    }
  }

  /**
 * attemps to get the customer's last order date
 */
  private getLastOrderDateByCustomer = (): void => {

    if (this.userService.isUserLoggedIn) {
      const observable = this.ordersService.getLastOrderDateByCustomer();

      observable.subscribe((succesfulServerResponse: string | null) => {
        // updates the customer's last order date text in the UI
        this.assignCustomerLastOrderDateText(succesfulServerResponse);

      }, badServerResponse => {
        PopupMessages.displayErrorPopupMessage(badServerResponse.error.errorMessage);
      });
    }
  };

  /**
 * attempts to get the total orders amount from the server
 */
  public getTotalOrdersAmount = (): void => {
    const observable = this.ordersService.getTotalOrdersAmount();

    observable.subscribe((succesfulServerResponse: number) => {
      this.totalOrdersAmount = succesfulServerResponse;

    }, badServerResponse => {
      PopupMessages.displayErrorPopupMessage(badServerResponse.error.errorMessage);
    });
  };


  // -------------------------------------------------------------------------------- Controller

  /**
   * intializes the listeners for this component
   */
  private initiateListeners = (): void => {

    // listening for changes of the customer's last order date, inside the orders service
    this.ordersService.customerLastOrderDateChange.subscribe((value: string | null) => {
      this.assignCustomerLastOrderDateText(value);
      if (value === undefined) {
        this.customerLastOrderDate = undefined;
      }
    });

    // listening for changes of the products, inside the products service
    this.productsService.allProductsChange.subscribe((value: Product[]) => {
      this.totalProductsAmount = value.length;
    });

    // listening for changes of the customer's current cart items, inside the cart service
    this.cartService.customerCurrentCartItemsChange.subscribe((value: CartItem[]) => {
      this.customerCurrentCartItems = value;
    });

    // listening for changes inside the customer's currect cart creation date, inside the cart service
    this.cartService.currentCartCreationDateChange.subscribe((value: string | null) => {
      this.currentCartCreationDate = value;
    });
  }

  
  // -------------------------------------------------------------------------------- View

  /**
   * 
   * @param lastOrderValue - assigns the value that was received from the server, to the 'last order date' text, in the UI
   */
  private assignCustomerLastOrderDateText = (lastOrderValue: string | null): void => {
    if (lastOrderValue === null) {
      this.customerLastOrderDate = "You don't have any previous orders";
    }
    else {
      this.customerLastOrderDate = "Your last order was on " + lastOrderValue;
    }
  };
}
