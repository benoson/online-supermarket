import { Component, OnInit } from '@angular/core';
import Product from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';
import PopupMessages from 'src/app/Utils/PopupMessages';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public allProducts: Product[];
  public searchInputValue: string;

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.allProducts = new Array <Product>();
    this.searchInputValue = "";
    this.checkIfShouldGetAllProducts();
  }

  private checkIfShouldGetAllProducts = () => {
    // if there aren't any products in the products service, get them from the server
    if (this.productsService.allProducts === undefined) {
      this.getAllProductsFromServer();
    }
    else {
      this.allProducts = this.productsService.allProducts;
    }
  }

  public getAllProductsFromServer = (): void => {
    const observable = this.productsService.getAllProducts();

    observable.subscribe( (succesfulServerResponse: Product[]) => {
      // updating the value in the service, letting it know we recieved the products
      this.productsService.allProductsChange.next(succesfulServerResponse);
      this.allProducts = succesfulServerResponse;

    }, badServerResponse => {
      PopupMessages.displayErrorPopupMessage(badServerResponse.error.errorMessage);
    });
  }

}
