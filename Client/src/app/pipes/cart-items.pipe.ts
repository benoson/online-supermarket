import { Pipe, PipeTransform } from '@angular/core';
import CartItemForDisplay from '../models/CartItemForDisplay';

@Pipe({
  name: 'cartItems'
})
export class CartItemsPipe implements PipeTransform {

  transform(cartItems: CartItemForDisplay[], valueToSearch: string): unknown {
    return cartItems.filter( cartItem => cartItem.productName.toLocaleLowerCase().includes(valueToSearch.toLocaleLowerCase()));
  }

}
