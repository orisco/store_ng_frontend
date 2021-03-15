import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import CartItemInterface from 'src/app/interfaces/cartIems.interface';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutDataService } from 'src/app/services/checkout-data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public currentItem: CartItemInterface[]


  constructor(public _cart: CartService, public _auth: AuthService, public _rt: Router, public _ck: CheckoutDataService) { }

  ngOnInit(): void {
      this._cart.getCart().subscribe((res: any) => {
        this._cart.openCart = res
        this._cart.addProduct._cartId = res._id
      })
    }
    

    
// change quantity in cart
    public changeQuantity(item: CartItemInterface, change: string){
      this._cart.savedChanges = false;
      // get current item
     this.currentItem = this._cart.cartItems.filter((i) => i._productId[0]._id === item._productId[0]._id) 
     
      // if increase quantity
     if (change === "increase") {
      this.currentItem[0].quantity = this.currentItem[0].quantity + 1
      this._cart.totalAmount += this.currentItem[0]._productId[0].price 
      
      // if 0 - delete item
    } else if (change === "decrease" && this.currentItem[0].quantity === 1) {

      // delete from cart collection
      this._cart.deleteOneItemFromCart(this.currentItem[0]._id).subscribe((res:any) => {console.log(res)},(err:any)=> {console.log(err)})

      // delete from frontend
      this._cart.cartItems = this._cart.cartItems.filter((i) => i._productId[0]._id != this.currentItem[0]._productId[0]._id) 
      this._cart.totalAmount -= this.currentItem[0]._productId[0].price * this.currentItem[0].quantity

    } else { // if decrease quantity
      this.currentItem[0].quantity = this.currentItem[0].quantity - 1
      this._cart.totalAmount -= this.currentItem[0]._productId[0].price
    }

    }

  deleteCart() {
    this._cart.deleteAllProductsFromCart(this._cart.openCart._id).subscribe((res: any) => {
      this._cart.cartItems = []
      this._cart.totalAmount = 0;
    })
    this._cart.deleteCart(this._cart.openCart._id).subscribe((res: any) => {
      this._cart.openCart = {
        _id: "",
        date: "",
        description: "",
        userId: ""      
      }
      this._cart.isCartOpen = false;
    })
  }

  updateAllCart() {
    this._cart.savedChanges = true;
    this._cart.updateAllCartItems().subscribe()
  }

  deleteOneItemFromCart(item) {
    this._cart.deleteOneItemFromCart(item._id).subscribe((res: any) => {
      this._cart.cartItems = this._cart.cartItems.filter((i) => i._id != item._id) 
      this._cart.totalAmount -= item.quantity * item._productId[0].price
    })
  }


  checkout() {
    this._cart.isCartOpen = false;
    this._rt.navigateByUrl('/checkout/' + this._cart.openCart._id)
  }
}
