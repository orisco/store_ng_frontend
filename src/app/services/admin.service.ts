import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import ProductInterface from '../interfaces/products.interface';
import { AuthService } from './auth.service';
import { CartService } from './cart.service';
import { ProductDataService } from './product-data.service';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public saveChanges = false;
  public adminProduct: ProductInterface
  public edit: boolean = false
  public error = false;

  constructor(public _cart: CartService, public _product: ProductDataService, public _rq: WebRequestService, public _rt: Router, public _auth: AuthService) { }


  // send product to admin panel
  sendProductToAdminPanel(product){
    this.adminProduct = product 
    this.edit = true;
    this.error = false;
    this._cart.isCartOpen = true;
  }

  // edit product in db
  editProduct(productId, body){
    return this._rq.put(`product/products/${productId}`, body)
  }

  // add a new product to db
  addProduct(body){
    return this._rq.post('product/products/new', body)
  }

  // delete product from db
  deleteProduct(productId) {
    return this._rq.delete(`product/products/${productId}`)
  }
}


