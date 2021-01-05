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

  public allProducts: Product[];

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.allProducts = new Array <Product> ();
    this.getAllProducts();
  }

  public getAllProducts = (): void => {
    const observable = this.productsService.getAllProducts();

    observable.subscribe( (succesfulServerResponse: Product[]) => {
      this.allProducts = succesfulServerResponse;
      console.log(succesfulServerResponse);

    }, badServerResponse => {
      ErrorMessages.displayErrorPopupMessage(badServerResponse.error.errorMessage);
    })
  }

}
