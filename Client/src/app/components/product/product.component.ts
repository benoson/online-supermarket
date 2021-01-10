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
    const newCartItem: CartItem = new CartItem(this.product.ID, quantity);

    const observable = this.cartService.addItemToCart(newCartItem);
  
    observable.subscribe( (succesfulServerResponse: CartItem) => {
      Swal.fire(
        'Item Added',
        'It has been added to your cart succesfully/111111.',
        'success'
      );

    }, badServerResponse => {
      PopupMessages.displayErrorPopupMessage(badServerResponse.error.errorMessage);
    });
  }
}
