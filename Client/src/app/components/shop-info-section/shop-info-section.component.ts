import { Component, Input, OnInit } from '@angular/core';
import Product from 'src/app/models/Product';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import ErrorMessages from 'src/app/Utils/ErrorMessages';

@Component({
  selector: 'app-shop-info-section',
  templateUrl: './shop-info-section.component.html',
  styleUrls: ['./shop-info-section.component.css']
})
export class ShopInfoSectionComponent implements OnInit {

  public totalProductsAmount: number;
  public totalOrdersAmount: number;

  constructor(
    private productsService: ProductsService,
    private ordersService: OrdersService
    ) { }

  ngOnInit(): void {
    // listening for changes of the products, inside the products service
    this.productsService.allProductsChange.subscribe( value => {
      this.totalProductsAmount = value.length;
    });

    this.getTotalOrdersAmount();
  }


  public getTotalOrdersAmount = (): void => {
    const observable = this.ordersService.getTotalOrdersAmount();

    observable.subscribe( (succesfulServerResponse: number) => {
      this.totalOrdersAmount = succesfulServerResponse;

    }, badServerResponse => {
      ErrorMessages.displayErrorPopupMessage(badServerResponse.error.errorMessage);
    });
  }

}
