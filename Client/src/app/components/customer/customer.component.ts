import { Component, OnInit } from '@angular/core';
import Product from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';
import PopupMessages from 'src/app/Utils/PopupMessages';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  public allProducts: Product[] = new Array <Product>();
  public currentProductsForDisplay: Product[];

  public dairyProducts: Product[];
  public meatAndFishProducts: Product[];
  public veganProducts: Product[];
  public drinksProducts: Product[];
  public healthProducts: Product[];

  public searchInputValue: string = "";

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.checkIfShouldGetAllProducts();
  }

  private checkIfShouldGetAllProducts = () => {
    // if there aren't any products in the products service, get them from the server
    if (this.productsService.allProducts === undefined) {
      this.getAllProducts();
    }
    else {
      this.allProducts = this.productsService.allProducts;
    }
    this.sortProductsToCategories();
  }

  public getAllProducts = (): void => {
    const observable = this.productsService.getAllProducts();

    observable.subscribe( (succesfulServerResponse: Product[]) => {
      // updating the value in the service, letting it know we recieved the products
      this.productsService.allProductsChange.next(succesfulServerResponse);
      this.allProducts = succesfulServerResponse;
      this.sortProductsToCategories();

    }, badServerResponse => {
      PopupMessages.displayErrorPopupMessage(badServerResponse.error.errorMessage);
    });
  }

  private sortProductsToCategories = () => {
    this.currentProductsForDisplay = this.allProducts;
    this.dairyProducts = this.allProducts.filter( product => product.category === 'Dairy');
    this.meatAndFishProducts = this.allProducts.filter(product => product.category === 'Meat & Fish');
    this.veganProducts = this.allProducts.filter(product => product.category === 'Vegan');
    this.drinksProducts = this.allProducts.filter(product => product.category === 'Drinks');
    this.healthProducts = this.allProducts.filter(product => product.category === 'Health');
  }

  public sortByAllProducts = () => {
    this.currentProductsForDisplay = this.allProducts;
  }

  public sortByDairyProducts = () => {
    this.currentProductsForDisplay = this.dairyProducts;
  }

  public sortByMeatAndFishProducts = () => {
    this.currentProductsForDisplay = this.meatAndFishProducts;
  }

  public sortByVeganProducts = () => {
    this.currentProductsForDisplay = this.veganProducts;
  }

  public sortByDrinks = () => {
    this.currentProductsForDisplay = this.drinksProducts;
  }

  public sortByHealthProducts = () => {
    this.currentProductsForDisplay = this.healthProducts;
  }
}
