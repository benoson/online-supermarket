import { Pipe, PipeTransform } from '@angular/core';
import Product from '../models/Product';

@Pipe({
  name: 'products'
})
export class ProductsPipe implements PipeTransform {

  transform(products: Product[], valueToSearch: string): any {
    return products.filter( product => product.name.toLocaleLowerCase().includes(valueToSearch.toLocaleLowerCase()));
  }

}
