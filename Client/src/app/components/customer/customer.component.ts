import { Component, OnInit } from '@angular/core';
import CartItemForDisplay from 'src/app/models/CartItemForDisplay';
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
  public customerCurrentCartItems: CartItemForDisplay[];

  public dairyProducts: Product[];
  public meatAndFishProducts: Product[];
  public veganProducts: Product[];
  public drinksProducts: Product[];
  public healthProducts: Product[];

  public searchInputValue: string;

  constructor(
    private productsService: ProductsService,
    public cartService: CartService
  ) { }

  ngOnInit(): void {
    this.searchInputValue = "";
    this.checkIfCartHasItems();
    this.checkIfShouldGetAllProducts();
    this.checkIfShouldGetCartItems();

    this.cartService.customerCurrentCartItemsChange.subscribe( (value: CartItemForDisplay[]) => {
      this.customerCurrentCartItems = value;
    })
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

  /**
   * this function checks whether the cart has items, if not, it initializes the class variable with an empty array
   */
  private checkIfCartHasItems = () => {
    if (this.cartService.customerCurrentCartItems !== undefined) {
      this.customerCurrentCartItems = this.cartService.customerCurrentCartItems;
    }
    else {
      this.customerCurrentCartItems = new Array<CartItemForDisplay>();
    }
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

    observable.subscribe( (succesfulServerResponse: CartItemForDisplay[]) => {
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
    this.searchInputValue = "";
    this.setCategoryIndication("all-products-nav-text");
  }

  public sortByDairyProducts = () => {
    this.currentProductsForDisplay = this.dairyProducts;
    this.searchInputValue = "";
    this.setCategoryIndication("dairy-nav-text");
  }

  public sortByMeatAndFishProducts = () => {
    this.currentProductsForDisplay = this.meatAndFishProducts;
    this.searchInputValue = "";
    this.setCategoryIndication("meat-fish-nav-text");
  }

  public sortByVeganProducts = () => {
    this.currentProductsForDisplay = this.veganProducts;
    this.searchInputValue = "";
    this.setCategoryIndication("vegan-nav-text");
  }

  public sortByDrinks = () => {
    this.currentProductsForDisplay = this.drinksProducts;
    this.searchInputValue = "";
    this.setCategoryIndication("drinks-nav-text");
  }

  public sortByHealthProducts = () => {
    this.currentProductsForDisplay = this.healthProducts;
    this.searchInputValue = "";
    this.setCategoryIndication("health-nav-text");
  }

  private setCategoryIndication = (currentCategory: string) => {
    const allNavCategoriesTexts = Array.from(document.getElementsByClassName("navbarLink"));
    for (let categoryText of allNavCategoriesTexts) {
      categoryText.classList.remove('current-category');
    }

    const newCategory = document.querySelector(`#${currentCategory}`);
    newCategory.classList.add('current-category');
  }
}
