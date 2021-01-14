import { Component, OnInit } from '@angular/core';
import Product from 'src/app/models/Product';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {

  public currentEditableProduct: Product;

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.currentEditableProduct = this.adminService.currentEditableProduct;
    
    // listening for changes in the admin's current product to be edited
    this.adminService.currentEditableProductChange.subscribe( (value: Product) => {
      this.currentEditableProduct = value;
    })
  }

}
