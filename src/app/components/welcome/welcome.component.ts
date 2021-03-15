import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import UserInterface from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutDataService } from 'src/app/services/checkout-data.service';
import { ProductDataService } from 'src/app/services/product-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  public orderCount: number;
  public totalProduct: number;

  constructor(public _auth: AuthService, public _rt: Router, public _ck:CheckoutDataService, public _product: ProductDataService, public _cart: CartService) { }


  ngOnInit(): void {
    this._auth.getUser().subscribe((res: UserInterface) => {
      this._auth.registeredUser = res
      this._auth.loggedIn = true;
    }).add(() => {
      this._ck.getCheckoutCount().subscribe((res: any) => {
        this.orderCount = res
      })
    }).add(() => {
      this._product.getProductsCount().subscribe((res: any) => {
        this.totalProduct = res
    })
   })
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
}
