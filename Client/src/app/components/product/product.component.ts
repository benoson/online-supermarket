import { Component, Input, OnInit } from '@angular/core';
import Product from 'src/app/models/Product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;

  constructor() { }

  ngOnInit(): void {
  }

  public showProductModal = () => {
    Swal.fire({
      title: this.product.name,
      text: this.product.description,
      imageUrl: this.product.imageURL,
      html:
      `
      <mat-form-field>
        <mat-label>ID</mat-label>
        <input [formControl]="IDInput" name="IDInput" matInput type="number" required>

        <mat-error *ngIf="IDInput.errors?.required">
            ID is <strong>required</strong>
        </mat-error>

        <mat-error *ngIf="IDInput.errors?.pattern">
            ID should be <strong>9 digits</strong>
        </mat-error>
      </mat-form-field>
      `,
      showCancelButton: true,
      confirmButtonColor: '#0099cc',
      cancelButtonColor: '#ff1616',
      confirmButtonText: 'Add To Cart'
    }).then((result) => {
      if (result.isConfirmed) {
        // ADD TO CART HERE--------------------------------------------
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

}
