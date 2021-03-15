import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductDataService } from 'src/app/services/product-data.service';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.scss']
})
export class AdminMainComponent implements OnInit {

  

  constructor(public _product: ProductDataService, public _ad: AdminService, public _activated: ActivatedRoute, public _cart: CartService) { }

  ngOnInit(): void {
    this._product.getCategories().subscribe((res: any) => {
      this._product.categories = res
    })
    this._ad.error = false;
  }

  editProduct(product_maker, product_name, description, detail, categoryId, price, image){
    if (!product_maker.value || !product_name.value || !description.value|| !detail.value || !price.value || !image.value || !categoryId.value) {
      this._ad.error = true;
    } else {
    const body = {
      product_maker: product_maker.value,
      product_name: product_name.value,
      description: description.value,
      categoryId: categoryId.value,
      detail: detail.value,
      price: price.value,
      image: image.value
    }
    this._ad.editProduct(this._ad.adminProduct._id, body).subscribe((res:any) => {
      this._ad.saveChanges = true;
      this._product.getProducts()
      this._ad.error = false;
    }) 
  }
  }

  addProduct(product_maker, product_name, detail, description,categoryId, price, image){
    if (!product_maker.value || !product_name.value || !description.value|| !detail.value || !price.value || !image.value || !categoryId.value) {
      this._ad.error = true;
    } else {
      const body = {
        product_maker: product_maker.value,
        product_name: product_name.value,
        description: description.value,
        categoryId: categoryId.value,
        detail: detail.value,
        price: price.value,
        image: image.value
      }
        this._ad.addProduct(body).subscribe((res:any) => {
        this._ad.saveChanges = true;
        this._product.getProducts()
        this._ad.error = false;
      })
    }
    
  }
}
