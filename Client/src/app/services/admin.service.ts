import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Product from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public currentEditableProduct: Product;
  public currentEditableProductChange: Subject<Product> = new Subject<Product>();

  public isShowProductAdditionSection: boolean;
  public isShowProductAdditionSectionChange: Subject<boolean> = new Subject<boolean>();

  constructor() {
    // listening for changes in the 'show product addition' indication
    this.isShowProductAdditionSectionChange.subscribe((value: boolean) => {
      this.isShowProductAdditionSection = value;
    });

    // listening for changes in the admin's current product to be edited
    this.currentEditableProductChange.subscribe((value: Product) => {
      this.currentEditableProduct = value;
    });
  }
}
