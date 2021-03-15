import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import UserInterface from 'src/app/interfaces/user.interface';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductDataService } from 'src/app/services/product-data.service';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.scss']
})

export class AllCategoriesComponent implements OnInit {

  // amount selection

  public counter = 0;

  constructor(public _product: ProductDataService, public _cart: CartService, public _r: Router, public _auth: AuthService, public _admin: AdminService, public _activated: ActivatedRoute) { }

  ngOnInit(): void {
      this._auth.userInfoMenu = false;
      // add user
        this._auth.getUser().subscribe((res: UserInterface) => {
          this._auth.registeredUser = res
          this._auth.loggedIn = true;
          })
      
      
      // add product
      this._product.getProducts()
      this._cart.getCart().subscribe((res: any) => {
      this._cart.openCart = res
      this._cart.addProduct._cartId = res._id
      }).add(() => {
      this._cart.getCartItems(this._cart.openCart._id).subscribe((res: any) => {
      this._cart.cartItems = res
      this._cart.total(this._cart.cartItems)
      })
    })
  }


  deleteProduct(product){
    this._admin.deleteProduct(product._id).subscribe(() => {
      this._product.getProducts()
    })
  }

  searching(value){
      this._product.searchProducts({value: value}).subscribe((res: any) => {
      this._r.navigateByUrl("/main/allcategories")
      this._product.allProducts = res;
    })
  }
}
