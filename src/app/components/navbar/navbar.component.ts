import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import CategoryInterface from 'src/app/interfaces/categories.interface';
import UserInterface from 'src/app/interfaces/user.interface';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutDataService } from 'src/app/services/checkout-data.service';
import { ProductDataService } from 'src/app/services/product-data.service';
import { WebRequestService } from 'src/app/services/web-request.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public categories: CategoryInterface
  public checkout: boolean;

  constructor(public _auth: AuthService, public _rt: Router, public _data: ProductDataService, public _activated: ActivatedRoute, public rq: WebRequestService, public _cart: CartService, public _product: ProductDataService, public _ck: CheckoutDataService, public _admin: AdminService) { }

  ngOnInit(): void {
    // check for search 
     if (this._activated.snapshot.params.cartId) {
       this.checkout = true;
     } 
      this._auth.getUser().subscribe((res: UserInterface) => {
        this._auth.registeredUser = res
        this._auth.loggedIn = true;
      })
    }

  logout() {
    this._auth.loggedIn = false;
    this._auth.logout()
    this._rt.navigateByUrl('/sign-in')
  }

  searching(value){
    this._product.searchProducts({value: value}).subscribe((res: any) => {
      this._rt.navigateByUrl("/main/allcategories")
      this._product.allProducts = res;
    })
  }

  adminAddNewProduct(){
    this._cart.isCartOpen = true; 
    this._product.byCategory = false;
    this._auth.userInfoMenu = false; 
    this._admin.edit = false; 
    this._admin.adminProduct = {
      _id: "",
      product_maker: "",
      product_name: "",
      description: "",
      categoryId: "",
      price: 0,
      image: "",
    }
  }
  
}
