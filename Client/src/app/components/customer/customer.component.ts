import { Component, OnInit } from '@angular/core';
import CartItemForDisplay from 'src/app/models/CartItemForDisplay';
import Product from 'src/app/models/Product';
import PopupMessages from 'src/app/Utils/PopupMessages';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';



@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  public allProducts: Product[];
  public currentProductsForDisplay: Product[];
  public customerCurrentCartItems: CartItemForDisplay[];

  public dairyProducts: Product[];
  public meatAndFishProducts: Product[];
  public veganProducts: Product[];
  public drinksProducts: Product[];
  public healthProducts: Product[];

  public searchInputValue: string;
  public isShowReceipt: boolean;

  constructor(
    private productsService: ProductsService,
    public cartService: CartService
  ) { }

  ngOnInit(): void {
    this.allProducts = new Array<Product>();
    this.searchInputValue = "";
    this.cartService.isShowReceiptChange.next(false);
    this.checkIfCartHasItems();
    this.checkIfShouldGetAllProducts();
    this.checkIfShouldGetCartItems();
    this.initiateListeners();
    this.checkIfCustomerNeedsNewCart();
  }

  // -------------------------------------------------------------------------------- Model

  /**
   * attempts to get all the products from the server
   */
  public getAllProductsFromServer = (): void => {
    const observable = this.productsService.getAllProducts();

    observable.subscribe((succesfulServerResponse: Product[]) => {
      // updating the value in the service, letting it know we recieved the products
      this.productsService.allProductsChange.next(succesfulServerResponse);
      this.allProducts = succesfulServerResponse;
      this.sortProductsToCategories();

    }, badServerResponse => {
      PopupMessages.displayErrorPopupMessage(badServerResponse.error.errorMessage);
    });
  }

  /**
   * attemps to get all the cart items of the current user
   */
  public getAllCartItems = (): void => {
    const observable = this.cartService.getCurrentCartItems();

    observable.subscribe((succesfulServerResponse: CartItemForDisplay[]) => {
      // updating the value in the service, letting it know we recieved the cart items
      this.cartService.customerCurrentCartItemsChange.next(succesfulServerResponse);

    }, badServerResponse => {
      PopupMessages.displayErrorPopupMessage(badServerResponse.error.errorMessage);
    });
  }


  // -------------------------------------------------------------------------------- Controller

  /**
   * initializes the listenres for this component
   */
  private initiateListeners = (): void => {
    // listening for changes of the 'show receipt' indication, inside the cart service
    this.cartService.isShowReceiptChange.subscribe((value: boolean) => {
      this.isShowReceipt = value;

      // preparing all the products for when the user will go back to the shopping page (doing it when the receipt is shown, to save time)
      if (this.isShowReceipt) {
        this.currentProductsForDisplay = this.allProducts;
      }
    });

    // listening for changes of the customer cart items inside the cart service
    this.cartService.customerCurrentCartItemsChange.subscribe((value: CartItemForDisplay[]) => {
      this.customerCurrentCartItems = value;
    })
  }

  /**
   * initializes the user's cart
   */
  private initializeCart = (): void => {
    // initializes the customer's cart with an empty array of cart items
    const initializedCartItems = new Array<CartItemForDisplay>();
    this.cartService.customerCurrentCartItemsChange.next(initializedCartItems);
  }

  /**
   * checking if there are products in the products service
   */
  private checkIfShouldGetAllProducts = (): void => {
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
   * checks if the customer needs a new cart
   */
  private checkIfCustomerNeedsNewCart = (): void => {
    if (this.cartService.currentCartCreationDate === null) {
      const observable = this.cartService.openNewCustomerCart();

      observable.subscribe(() => {
        PopupMessages.displaySuccessPopupMessage('Opened a new cart for you :)');
      }, badServerResponse => {
        PopupMessages.displayErrorPopupMessage(badServerResponse.error.errorMessage);
      });
    }
  }

  /**
 * this function checks whether the cart has items, if not, it initializes the class variable with an empty array
 */
  private checkIfCartHasItems = (): void => {
    // if there arent any cart items, initialize the cart with an empty array of cart items
    if (this.cartService.customerCurrentCartItems !== undefined) {
      this.customerCurrentCartItems = this.cartService.customerCurrentCartItems;
    }
    else {
      this.customerCurrentCartItems = new Array<CartItemForDisplay>();
    }
  }

  /**
   * checking if should get cart items from the server
   */
  private checkIfShouldGetCartItems = (): void => {
    this.initializeCart();
    // if there aren't any cart items in the service, attempt to get them from the server (this is in case a user refreshes the customer's page)
    if (this.cartService.customerCurrentCartItems.length === 0) {
      this.getAllCartItems();
    }
  }

  /**
   * sorting the products array to show all the products
   */
  public sortByAllProducts = (): void => {
    this.currentProductsForDisplay = this.allProducts;
    this.searchInputValue = "";
    this.setCategoryIndication("all-products-nav-text");
  }

  /**
   * sorting the products array by dairy products
   */
  public sortByDairyProducts = (): void => {
    this.currentProductsForDisplay = this.dairyProducts;
    this.searchInputValue = "";
    this.setCategoryIndication("dairy-nav-text");
  }

  /**
 * sorting the products array by meat and fish products
 */
  public sortByMeatAndFishProducts = (): void => {
    this.currentProductsForDisplay = this.meatAndFishProducts;
    this.searchInputValue = "";
    this.setCategoryIndication("meat-fish-nav-text");
  }

  /**
 * sorting the products array by vegan products
 */
  public sortByVeganProducts = (): void => {
    this.currentProductsForDisplay = this.veganProducts;
    this.searchInputValue = "";
    this.setCategoryIndication("vegan-nav-text");
  }

  /**
 * sorting the products array by drinks
 */
  public sortByDrinks = (): void => {
    this.currentProductsForDisplay = this.drinksProducts;
    this.searchInputValue = "";
    this.setCategoryIndication("drinks-nav-text");
  }

  /**
  * sorting the products array by health products
  */
  public sortByHealthProducts = (): void => {
    this.currentProductsForDisplay = this.healthProducts;
    this.searchInputValue = "";
    this.setCategoryIndication("health-nav-text");
  }

  /**
  * sorting the products array to categories
  */
  private sortProductsToCategories = (): void => {
    this.currentProductsForDisplay = this.allProducts;
    this.dairyProducts = this.allProducts.filter(product => product.category === 'Dairy');
    this.meatAndFishProducts = this.allProducts.filter(product => product.category === 'Meat & Fish');
    this.veganProducts = this.allProducts.filter(product => product.category === 'Vegan');
    this.drinksProducts = this.allProducts.filter(product => product.category === 'Drinks');
    this.healthProducts = this.allProducts.filter(product => product.category === 'Health');
  }


  // -------------------------------------------------------------------------------- View

  /**
   * 
   * @param currentCategory displays indication of current category chosen in the navbar
   */
  private setCategoryIndication = (currentCategory: string): void => {
    // removing all previous indications in the navbar
    const allNavCategoriesTexts = Array.from(document.getElementsByClassName("navbarLink"));
    for (let categoryText of allNavCategoriesTexts) {
      categoryText.classList.remove('current-category');
    }

    // indicating the new category in the navbar
    const newCategory = document.querySelector(`#${currentCategory}`);
    newCategory.classList.add('current-category');
  }
}
