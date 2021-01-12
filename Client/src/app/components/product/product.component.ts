import { Component, Input, OnInit } from '@angular/core';
import CartItem from 'src/app/models/CartItem';
import CartItemForDisplay from 'src/app/models/CartItemForDisplay';
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
    console.log(this.cartService.customerCurrentCartItems);
    
    Swal.fire({
      title: this.product.name,
      imageUrl: this.product.imageURL,
      html:
      `<p>${this.product.description}</p>
      <input id='modalQuantityInput' type=number min=1 max=99 value='1'
          style='border: 2px solid #21e6c1; border-radius: 3px; padding: 3px 10px; outline: none' />`,
      showCancelButton: true,
      confirmButtonColor: '#0099cc',
      cancelButtonColor: '#ff1616',
      confirmButtonText: 'Add To Cart',
      preConfirm: () => {
        const modalQuantityInput = document.getElementById('modalQuantityInput') as HTMLInputElement;
        const quantity = modalQuantityInput.valueAsNumber;

        // validating that the quantity is between 1 and 99
        try {
          if (quantity < 1 || quantity > 99) {
            throw new Error('Quantity can be between 1 - 99')
          }
        }
        catch (error) {
          Swal.showValidationMessage(`${error}`)
        }
      },
    }).then((result) => {
      
      if (result.isConfirmed) {
        const modalQuantityInput = document.getElementById('modalQuantityInput') as HTMLInputElement;
        const quantity = modalQuantityInput.valueAsNumber;
        this.onAddToCartClick(quantity);
      }
    })
  };

  private onAddToCartClick = (quantity: number) => {
    console.log(this.cartService.customerCurrentCartItems);

    const newCartItem: CartItemForDisplay = new CartItemForDisplay(this.product.ID, this.product.name, quantity, this.product.price);

    const isItemAlreadyExistInCart = this.checkIfItemExistInCart();
    
    if (isItemAlreadyExistInCart) {
      this.updateExistingCartItem(newCartItem);
    }
    else {
      this.addNewItemToCart(newCartItem);
    }
  }

  private addNewItemToCart = (newCartItem: CartItemForDisplay) => {
    // sending a CartItem object, and not a CartItemForDisplay object, because it is more suitable for the server (without unnecessary properties)
    const newItemToCart = new CartItem(newCartItem.productID, newCartItem.amount);
    const observable = this.cartService.addItemToCart(newItemToCart);
    observable.subscribe( () => {
      // adding the new cart item to the local cart
      const currentCartItems = [...this.cartService.customerCurrentCartItems];
      currentCartItems.push(newCartItem);
      this.cartService.customerCurrentCartItemsChange.next(currentCartItems);

      Swal.fire(
        'Item Added To Cart!',
        `Added ${newCartItem.amount} ${this.product.name} To Your Cart`,
        'success'
      );

    }, badServerResponse => {
      PopupMessages.displayErrorPopupMessage(badServerResponse.error.errorMessage);
    });
  }

  private updateExistingCartItem = (updatedCartItem: CartItemForDisplay) => {
    // sending a CartItem object, and not a CartItemForDisplay object, because it is more suitable for the server (without unnecessary properties)
    const newItemToCart = new CartItem(updatedCartItem.productID, updatedCartItem.amount);
    const observable = this.cartService.updateCartItem(newItemToCart);
  
    observable.subscribe( () => {

      // updating the item in the local cart
      const currentCartItems = [...this.cartService.customerCurrentCartItems];
      const itemInsideCart = currentCartItems.filter( (cartItem: CartItemForDisplay) => cartItem.productID === updatedCartItem.productID);
      const itemIndexInsideCart = currentCartItems.indexOf(itemInsideCart[0]);
      currentCartItems[itemIndexInsideCart] = updatedCartItem;

      this.cartService.customerCurrentCartItemsChange.next(currentCartItems);

      Swal.fire(
        'Item Updated In Cart!',
        `Updated ${this.product.name} To Be ${updatedCartItem.amount} In Your Cart`,
        'success'
      );

    }, badServerResponse => {
      PopupMessages.displayErrorPopupMessage(badServerResponse.error.errorMessage);
    });
  }

  private checkIfItemExistInCart = (): boolean => {
    const isItemAlreadyExist = this.cartService.customerCurrentCartItems.filter( (cartItem: CartItemForDisplay) => cartItem.productID === this.product.ID);
    if (isItemAlreadyExist.length === 0) {
      return false;
    }
    // returning 'true' and the item iteself
    return true;
  }
}
