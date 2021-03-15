import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import CartInterface from 'src/app/interfaces/cart.interface';
import UserInterface from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutDataService } from 'src/app/services/checkout-data.service';
import { saveAs } from 'file-saver';
import DateInterface from 'src/app/interfaces/date.interface';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

public sameInfo = false;
public cc = 0;
public addressSaved = false;
public processed = false;
public dates = [];
public selected = false;


  constructor(public _ck: CheckoutDataService, public _cart: CartService, public _auth: AuthService, public _rt: Router) { }

  ngOnInit(): void {
    this._ck.date = false;
    this._ck.cartSummary = true;
    this._ck.checkout = {
      _id: "",
      customerId: {},
      _cartId: "",
      _cartItem: [],
      finalPrice: 0,
      delivery_date: "",
      order_date: "",
      credit_card: ""
    }

    this._ck.getDates().subscribe((res: DateInterface[]) => {
      res.filter((date) => {
        this.dates.push(date._id.date)
      })
    })
    this._auth.getUser().subscribe((res: UserInterface) => {
      this._ck.checkout.customerId = res
    }).add(() => {
      this._cart.getCart().subscribe((res: CartInterface) => {
        this._ck.checkout._cartId = res._id
      }).add(() => {
        this._cart.getCartItems(this._ck.checkout._cartId).subscribe((res: any) => {
          const arr = res
          arr.map((item) => {
            this._ck.checkout._cartItem.push(item)
            this._ck.checkout.finalPrice += item.quantity * item._productId[0].price
          })
        })
      })
    })
  } 


  backToCart() {
    this._rt.navigateByUrl('/main/allcategories')
    this._cart.isCartOpen = true;
  }

  // after checkout complete
  backToMain() {
    this._rt.navigateByUrl('/main/allcategories')
    this._cart.deleteAllProductsFromCart(this._ck.checkout._cartId).subscribe((res: any) => {
    this._cart.totalAmount = 0;
    }).add(() => {
      this._cart.deleteCart(this._ck.checkout._cartId).subscribe((res: any) => {
        this._cart.isCartOpen = false;
        this._cart.openCart = {
          _id: "",
          date: "",
          description: "",
          userId: ""      
        }
        this._cart.addProduct = {
          _productId: "",
          quantity: 0,
          _cartId: "", 
        }
      })
    })
    this._ck.cartSummary = true; 
  }

  switchToAddressTab(address: HTMLElement){
    this._ck.cartSummary = false; 
    this._ck.address = true
    address.scrollIntoView({behavior: "smooth", block: "end"});
  }
  

  switchToDateTab(date: HTMLElement) {
    this._ck.address= false;
    this._ck.date = true;
    date.scrollIntoView({behavior: "smooth", block: "end"});
  }


  is_creditCard(str) { 
    let RegExp = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;
    // console.log("start")
       if (RegExp.test(str)) {
           this._ck.checkout.credit_card = str.slice(str.length - 4) 
            this.cc = 1;
          }  else {
            this.cc = 2;
          }
  }

  getInfo() {
    this.sameInfo = !this.sameInfo
  }

  postCheckoutSummary() {
    let summary = {
      customer_name: this._ck.checkout.customerId[0].firstName + " " + this._ck.checkout.customerId[0].lastName,
      delivery_city: this._ck.checkout.customerId[0].city,
      delivery_street: this._ck.checkout.customerId[0].street,
      cartId: this._ck.checkout._cartId,
      orderDate: new Date(), 
      final_price: this._ck.checkout.finalPrice,
      delivery_date: this._ck.checkout.delivery_date,
      cc: this._ck.checkout.credit_card
    }
    this._ck.addCheckoutSummary(summary).subscribe((res: any) => {
      this._ck.checkout._id = res._id
      this.processed = true;
      this._ck.cartSummary = false;
      this._ck.address = false;
      this._ck.date = false;
    })
  }

  getSummary(){
    this._ck.getCheckoutSummary(this._ck.checkout._id).subscribe((res: any) => {
      let blob = new Blob([res], {type: 'application/octet-stream'} )
      let url = window.URL.createObjectURL(blob);
      saveAs(blob, "Summary.txt");

    }, (err: any) => {
      console.log(err)
    })
  }

  sendInfo(street, city) {
    if (street.selectedIndex !== 0 && street.value != "") {
      this._ck.checkout.customerId[0].city = city.value; 
      this._ck.checkout.customerId[0].street = street.value; 
      this.addressSaved = true
    }
  }

    checkDates($event){
    this._ck.checkout.delivery_date = $event.value
    this.selected = true;
    }

    myFilter = (d: Date) => {
      return this.dates.findIndex( (date) => d.toISOString() == date) == -1
      }
    }
