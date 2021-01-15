import { Component, OnInit } from '@angular/core';
import Product from 'src/app/models/Product';
import { AdminService } from 'src/app/services/admin.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import PopupMessages from 'src/app/Utils/PopupMessages';
import Swal from 'sweetalert2';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {

  public currentEditableProduct: Product;
  private currentNewProductAfterChanges: Product;

  constructor(
    private adminService: AdminService,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.initializeDefinitions();
    this.initializeListeners();
  }

  private initializeDefinitions = () => {
    this.currentEditableProduct = this.adminService.currentEditableProduct;

    if (this.currentEditableProduct !== undefined) {
      this.currentNewProductAfterChanges = new Product(this.currentEditableProduct.ID, this.currentEditableProduct.name, this.currentEditableProduct.description, this.currentEditableProduct.category, this.currentEditableProduct.price, this.currentEditableProduct.imageURL);
    }
  }

  private initializeListeners = () => {
    // listening for changes in the admin's current product to be edited
    this.adminService.currentEditableProductChange.subscribe( (value: Product) => {
      this.currentEditableProduct = value;
      this.currentNewProductAfterChanges = value;
    });
  }

  public editProductName = () => {
    Swal.fire({
      title: `Set a new name to ${this.currentEditableProduct.name}`,
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Update',
      preConfirm: (newProductName: string) => {
        if (newProductName.trim() !== "") {
          this.currentNewProductAfterChanges.name = newProductName;
          this.updateProduct();
        }
        else {
          PopupMessages.displayErrorPopupMessage("Name can't be empty");
        }
      }
    });
  }

  public editProductCategory = () => {
    Swal.fire({
      title: `Set a new category to ${this.currentEditableProduct.name}`,
      input: 'select',
      inputOptions: {
        'Dairy': 'Dairy',
        'Meat & Fish': 'Meat & Fish',
        'Vegan': 'Vegan',
        'Drinks': 'Drinks',
        'Health': 'Health',
      },
      showCancelButton: true,
      confirmButtonText: 'Update',
      preConfirm: (newProductCategory: string) => {
        if (newProductCategory.trim() !== "") {
          this.currentNewProductAfterChanges.category = newProductCategory;
          this.updateProduct();
        }
        else {
          PopupMessages.displayErrorPopupMessage("Category can't be empty");
        }
      }
    });
  }

  public editProductDescription = () => {
    Swal.fire({
      title: `Set a new description to ${this.currentEditableProduct.name}`,
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Update',
      preConfirm: (newProductDescription: string) => {
        if (newProductDescription.trim() !== "") {
          this.currentNewProductAfterChanges.description = newProductDescription;
          this.updateProduct();
        }
        else {
          PopupMessages.displayErrorPopupMessage("Description can't be empty");
        }
      }
    });
  }

  public editProductPrice = () => {
    Swal.fire({
      title: `Set a new price to ${this.currentEditableProduct.name}`,
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Update',
      preConfirm: (newProductPrice: string) => {
        if (+newProductPrice > 0) {
          const newPrice = +newProductPrice;
          this.currentNewProductAfterChanges.price = +newPrice.toFixed(2);
          this.updateProduct();
        }
        else {
          PopupMessages.displayErrorPopupMessage("Price must be larger than 0");
        }
      }
    });
  }

  public editProductImage = () => {
    Swal.fire({
      title: `Set a new image to ${this.currentEditableProduct.name}`,
      imageUrl: this.currentEditableProduct.imageURL,
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Update',
      preConfirm: (newProductImage: string) => {
        if (newProductImage.length > 0) {
          this.currentNewProductAfterChanges.imageURL = newProductImage;
          this.updateProduct();
        }
        else {
          PopupMessages.displayErrorPopupMessage("Image url is not valid");
        }
      }
    });
  }

  private updateProduct = () => {
    const updatedProduct = new Product(this.currentNewProductAfterChanges.ID, this.currentNewProductAfterChanges.name, this.currentNewProductAfterChanges.description, this.currentNewProductAfterChanges.category, this.currentNewProductAfterChanges.price, this.currentNewProductAfterChanges.imageURL);
    const observable = this.productsService.updateProduct(updatedProduct);

    observable.subscribe( () => {
      PopupMessages.displaySuccessPopupMessage('The product is updated!');
    }, badServerResponse => {
      PopupMessages.displayErrorPopupMessage(badServerResponse.error.errorMessage);
    });
  }

}