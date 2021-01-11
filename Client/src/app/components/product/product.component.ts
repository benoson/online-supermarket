import { Component, Input, OnInit } from '@angular/core';
import CartItem from 'src/app/models/CartItem';
import Product from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';
import PopupMessages from 'src/app/Utils/PopupMessages';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
  }

  public showProductModal = () => {
    Swal.fire({
      title: this.product.name,
      text: this.product.description,
      imageUrl: this.product.imageURL,
      input: 'number',
      showCancelButton: true,
      confirmButtonColor: '#0099cc',
      cancelButtonColor: '#ff1616',
      confirmButtonText: 'Add To Cart'
    }).then((result) => {
      
      if (result.isConfirmed) {
        const quantity = result.value;
        this.addItemToCart(quantity);
      }
    })
  };

  private addItemToCart = (quantity: number) => {
    console.log(this.cartService.customerCurrentCartItems);
    
    const cartItem: CartItem = new CartItem(this.product.ID, quantity);
    const isItemAlreadyExistInCart = this.checkIfItemExistInCart();
    
    if (isItemAlreadyExistInCart) {
      this.updateExistingCartItem(cartItem);
    }
    else {
      this.addNewItemToCart(cartItem);
    }
  }

  private addNewItemToCart = (newCartItem: CartItem) => {
    const observable = this.cartService.addItemToCart(newCartItem);
  
    observable.subscribe( () => {
      Swal.fire(
        'Item Added To Cart!',
        `Added ${newCartItem.quantity} ${this.product.name} To Your Cart`,
        'success'
      );

    }, badServerResponse => {
      PopupMessages.displayErrorPopupMessage(badServerResponse.error.errorMessage);
    });
  }

  private updateExistingCartItem = (updatedCartItem: CartItem) => {
    const observable = this.cartService.updateCartItem(updatedCartItem);
  
    observable.subscribe( () => {
      Swal.fire(
        'Item Updated In Cart!',
        `Updated ${this.product.name} To Be ${updatedCartItem.quantity} In Your Cart`,
        'success'
      );

    }, badServerResponse => {
      PopupMessages.displayErrorPopupMessage(badServerResponse.error.errorMessage);
    });
  }

  private checkIfItemExistInCart = () => {
    const isItemAlreadyExist = this.cartService.customerCurrentCartItems.filter( (cartItem: CartItem) => cartItem.productID === this.product.ID);
    if (isItemAlreadyExist.length === 0) {
      return false;
    }
    return true;
  }
}
