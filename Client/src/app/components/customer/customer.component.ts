import { Component, OnInit } from '@angular/core';
import Product from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  public allProducts: Product[];
  public currentProductsForDisplay: Product[];

  public dairyProducts: Product[];
  public meatAndFishProducts: Product[];
  public veganProducts: Product[];
  public drinksProducts: Product[];
  public healthProducts: Product[];

  public searchInputValue: string;

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.allProducts = this.productsService.allProducts;
    this.currentProductsForDisplay = this.allProducts;
    this.sortProductsToCategories();
  }

  private sortProductsToCategories = () => {
    this.dairyProducts = this.allProducts.filter( product => product['category'] === 'Dairy');
    this.meatAndFishProducts = this.allProducts.filter(product => product['category'] === 'Meat & Fish');
    this.veganProducts = this.allProducts.filter(product => product['category'] === 'Vegan');
    this.drinksProducts = this.allProducts.filter(product => product['category'] === 'Drinks');
    this.healthProducts = this.allProducts.filter(product => product['category'] === 'Health');
  }

  public sortByAllProducts = () => {
    this.currentProductsForDisplay = this.allProducts;
  }

  public sortByDairyProducts = () => {
    this.currentProductsForDisplay = this.dairyProducts;
  }

  public sortByMeatAndFish = () => {
    this.currentProductsForDisplay = this.meatAndFishProducts;
  }

  public sortByVegan = () => {
    this.currentProductsForDisplay = this.veganProducts;
  }

  public sortByDrinks = () => {
    this.currentProductsForDisplay = this.drinksProducts;
  }

  public sortByHealth = () => {
    this.currentProductsForDisplay = this.healthProducts;
  }
}
