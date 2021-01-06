import { Component, OnInit } from '@angular/core';
import Product from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';
import ErrorMessages from 'src/app/Utils/ErrorMessages';


@Component({
  selector: 'app-welcome-sections',
  templateUrl: './welcome-sections.component.html',
  styleUrls: ['./welcome-sections.component.css']
})
export class WelcomeSectionsComponent implements OnInit {

  constructor(
    private productsService: ProductsService,
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts = (): void => {
    const observable = this.productsService.getAllProducts();

    observable.subscribe( (succesfulServerResponse: Product[]) => {
      // updating the value in the service, letting it know we recieved the products
      this.productsService.allProductsChange.next(succesfulServerResponse);

    }, badServerResponse => {
      ErrorMessages.displayErrorPopupMessage(badServerResponse.error.errorMessage);
    })
  }

}
