import { Component, Input, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import PopupMessages from 'src/app/Utils/PopupMessages';
import UsersUtils from 'src/app/Utils/UsersUtils';

@Component({
  selector: 'app-shop-info-section',
  templateUrl: './shop-info-section.component.html',
  styleUrls: ['./shop-info-section.component.css']
})
export class ShopInfoSectionComponent implements OnInit {

  public totalProductsAmount: number;
  public totalOrdersAmount: number;
  public customerLastOrderDate: string;

  constructor(
    private productsService: ProductsService,
    private ordersService: OrdersService
    ) { };


  ngOnInit(): void {
    this.initiateListeners();
    this.getLastOrderDateByCustomer();
    this.getTotalOrdersAmount();
  }

  private initiateListeners = () => {

    // listening for changes of the customer's last order date, inside the orders service
    this.ordersService.customerLastOrderDateChange.subscribe( (value: string | null) => {
      this.assignCustomerLastOrderDateText(value);
    });

    // listening for changes of the products, inside the products service
    this.productsService.allProductsChange.subscribe( value => {
      this.totalProductsAmount = value.length;
    });
  }

  /**
   * this function checks whether a request to get the last order date of the customer has dispatched.
   * if not, it will dispatch a request to get the last order date of the customer.
   */
  private getLastOrderDateByCustomer = (): void => {

    if (UsersUtils.isUserLoggedIn()) {
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
