import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import CartInterface from '../interfaces/cart.interface';
import CartItemInterface from '../interfaces/cartIems.interface';
import { AuthService } from './auth.service';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public isCartOpen = false;
  // cart buttons
  public savedChanges = false;
  
  public addProduct = {
    _productId : "",
    quantity: 0,
    _cartId: ""
  }

  public addToCart = {
    isShown: false,
    id: ""
  };

  public openCart: CartInterface
  public totalAmount = 0;
  public cartItems: CartItemInterface[] = []

  constructor(public _rq:WebRequestService, public _auth: AuthService) { }


  // get user's cart 
  getCart() {
    return this._rq.get('cart')
  }


  // delete cart
  deleteCart(cartId) {
    return this._rq.delete(`cart/${cartId}`)
  }

  // get cart items
  getCartItems(cartId) {
    return this._rq.get(`cart/${cartId}`)
  }

  // add a new product to cart
  addProductToCart(){
    return this._rq.post('cart/addproduct', this.addProduct)
  }

  // delete products from cart
  deleteAllProductsFromCart(cartId) {
    return this._rq.delete(`cart/all/${cartId}`)
  }

  // update cart
  updateAllCartItems() {
    return this._rq.post(`cart/update/${this.openCart._id}`, this.cartItems)
  }

  // delete one item from cart
  deleteOneItemFromCart(_id) {
    return this._rq.delete(`cart/products/${_id}`)
  }

  // update one item quantity
  updateOneItemsQuantity(_id, quantity) {
    return this._rq.put(`cart/update/${_id}`, quantity)
  }

  // calculate cart total function
  public total(items) {
    this.totalAmount = 0;
    items.map((item) => {      
       this.totalAmount += item.quantity * item._productId[0].price
    })
  }

  addProductToCartFunc(product, quantity) {
    // reset saved changed button
    this.savedChanges = false;
    
    // open cart if isn't open
    this._auth.userInfoMenu = false;
    this.isCartOpen = true

    // reset add button
    this.addToCart = {
    isShown: false,
    id: ""
    }
    
    // check if product is in cart
    const item = this.cartItems && this.cartItems.filter((item) => {
    return item._productId[0]._id == product._id
    })

    // if product is in cart - update quantity
    if (item && item.length == 1) {
       item[0].quantity += quantity
       this.totalAmount += product.price * quantity;
       // update server
      this.updateOneItemsQuantity(item[0]._id, {quantity: item[0].quantity}).subscribe()

      } else { // if item is not in the cart

        // is no cart ?
        if (!this.openCart._id ) {
          
          this.getCart().subscribe((res: any) => {
            
            this.openCart = res
            this.addProduct._cartId = res._id
            this.addProduct = {
              _productId: product._id,
              quantity: parseInt(quantity),
              _cartId: this.openCart._id 
            } 
          }).add(() => {
            this.addProductToCart().subscribe((res:any) => {
              this.cartItems = [{
                _productId: [product],
               _id: res._id,
               quantity: quantity,
               _cartId: this.openCart._id,
               }]
               
               this.totalAmount += product.price * quantity;
          })
          })
          // if cart exist? 
      } else {
        this.totalAmount += product.price * quantity;
        this.addProduct = {
          _productId: product._id,
          quantity: parseInt(quantity),
          _cartId: this.openCart._id 
        } 
        // upload to server
        this.addProductToCart().subscribe((res:any) => {
          // if items array is empty:
          if (this.cartItems.length == 0) {
            this.cartItems = [{
             _productId: [product],
            _id: res._id,
            quantity: quantity,
            _cartId: this.openCart._id,
            }]
  
          } else {
            // if items array has more than one products
            this.cartItems.push({
              _productId: [product],
              _id: res._id,
              quantity: quantity,
              _cartId: this.openCart._id,
            })
          } 
        })
      }       
    }
  }
}