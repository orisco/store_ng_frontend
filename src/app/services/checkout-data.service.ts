import { Injectable } from '@angular/core';
import CheckoutInterface from '../interfaces/checkout.interface';
import { AuthService } from './auth.service';
import { CartService } from './cart.service';
import { WebRequestInterceptor } from './web-request-interceptor.service';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutDataService {

  public checkoutPage = false;
  public payment = false;
  public searchWord: string;
  public cartSummary = true;
  public address = false;
  public date = false;
  public checkout: CheckoutInterface = {
    customerId: {},
    _cartId: "",
    _cartItem: [],
    finalPrice: 0,
    delivery_date: "",
    order_date: "",
    credit_card: ""
  }

  constructor(public _rq: WebRequestService) { }

  // search products in cart summary
  searchCart(key) {
    this.searchWord = key.target.value
  }

  // add checkout summary
  addCheckoutSummary(body) {
    return this._rq.post('checkout/checkout-summary', body)
  }

  // get checkout summary
  getCheckoutSummary(checkoutId) {
    return this._rq.getFile(`checkout/${checkoutId}`)
  }

  // get checkout count (orders made)
  getCheckoutCount(){
    return this._rq.get('checkout/count')
  }


  // get order dates already in place
  getDates(){
    return this._rq.get('checkout/dates')
  }
}
