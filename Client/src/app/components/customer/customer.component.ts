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
  public dairyProducts: Product[];
  public meatAndFish: Product[];
  public veganProducts: Product[];
  public drinks: Product[];
  public healthProducts: Product[];

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.allProducts = this.productsService.allProducts;
  }

  private sortProductsToCategories = () => {
    // this.milkAndEggs
  }

}
