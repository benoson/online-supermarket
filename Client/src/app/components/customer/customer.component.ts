import { Component, OnInit } from '@angular/core';
import CartItem from 'src/app/models/CartItem';
import Product from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';
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
    private productsService: ProductsService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.checkIfShouldGetAllProducts();
    this.checkIfShouldGetCartItems();
  }

  private checkIfShouldGetAllProducts = () => {
    // if there aren't any products in the products service, get them from the server
    if (this.productsService.allProducts === undefined) {
      this.getAllProductsFromServer();
    }
    else {
      this.allProducts = this.productsService.allProducts;
    }
    this.sortProductsToCategories();
  }

  private checkIfShouldGetCartItems = () => {
    // if there aren't any cart items in the service, attempt to get them from the server (this is for a case where a user refreshes the customer's page)
    if (this.cartService.customerCurrentCartItems === undefined) {
      this.getAllCartItems();
    }
  }

  public getAllProductsFromServer = (): void => {
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

  public getAllCartItems = (): void => {
    const observable = this.cartService.getCurrentCartItems();

    observable.subscribe( (succesfulServerResponse: CartItem[]) => {
      // updating the value in the service, letting it know we recieved the cart items
      this.cartService.customerCurrentCartItemsChange.next(succesfulServerResponse);

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
