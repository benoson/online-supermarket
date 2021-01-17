import { Component, Input, OnInit } from '@angular/core';
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

  private initiateListeners = () => {

    // listening for changes of the customer's last order date, inside the orders service
    this.ordersService.customerLastOrderDateChange.subscribe( (value: string | null) => {
      this.assignCustomerLastOrderDateText(value);
      if (value === undefined) {
        this.customerLastOrderDate = undefined;
      }
    });

    // listening for changes of the products, inside the products service
    this.productsService.allProductsChange.subscribe( (value: Product[]) => {
      this.totalProductsAmount = value.length;
    });

    // listening for changes of the customer's current cart items, inside the cart service
    this.cartService.customerCurrentCartItemsChange.subscribe( (value: CartItem[]) => {
      this.customerCurrentCartItems = value;
    });

    // listening for changes inside the customer's currect cart creation date, inside the cart service
    this.cartService.currentCartCreationDateChange.subscribe( (value: string | null) => {
      this.currentCartCreationDate = value;
    });
  }

  private getCustomerCurrentCartItems = () => {

    if (this.userService.isUserLoggedIn) {
      const observable = this.cartService.getCurrentCartItems();
    
      observable.subscribe( (succesfulServerResponse: CartItemForDisplay[]) => {
        this.cartService.customerCurrentCartItemsChange.next(succesfulServerResponse);
  
      }, badServerResponse => {
        PopupMessages.displayErrorPopupMessage(badServerResponse.error.errorMessage);
      });
    }
  }

  private getCustomerCurrentCartCreationDate = () => {

    if (this.userService.isUserLoggedIn) {
      const observable = this.cartService.getCustomerCurrentCartCreationDate();
    
      observable.subscribe( (succesfulServerResponse: string | null) => {
        this.cartService.currentCartCreationDateChange.next(succesfulServerResponse);
  
      }, badServerResponse => {
        PopupMessages.displayErrorPopupMessage(badServerResponse.error.errorMessage);
      });
    }
  }

  /**
   * this function checks whether a request to get the last order date of the customer has dispatched.
   * if not, it will dispatch a request to get the last order date of the customer.
   */
  private getLastOrderDateByCustomer = (): void => {
    
    if (this.userService.isUserLoggedIn) {
      const observable = this.ordersService.getLastOrderDateByCustomer();
  
      observable.subscribe( (succesfulServerResponse: string | null) => {
        this.assignCustomerLastOrderDateText(succesfulServerResponse);
  
      }, badServerResponse => {
        PopupMessages.displayErrorPopupMessage(badServerResponse.error.errorMessage);
      });
    }
  };

  private assignCustomerLastOrderDateText = (lastOrderValue: string | null) => {
    if (lastOrderValue === null) {
      this.customerLastOrderDate = "You don't have any previous orders";
    }
    else {
      this.customerLastOrderDate = "Your last order was on " + lastOrderValue;
    }
  };

  public getTotalOrdersAmount = (): void => {
    const observable = this.ordersService.getTotalOrdersAmount();

    observable.subscribe( (succesfulServerResponse: number) => {
      this.totalOrdersAmount = succesfulServerResponse;

    }, badServerResponse => {
      PopupMessages.displayErrorPopupMessage(badServerResponse.error.errorMessage);
    });
  };

}
