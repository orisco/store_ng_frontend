import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductDataService } from 'src/app/services/product-data.service';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.scss']
})
export class DetailedComponent implements OnInit {

  counter = 0;

  constructor(public _product: ProductDataService, public _cart: CartService, public _auth: AuthService) { 
  }

  ngOnInit(): void {
    this._cart.addToCart = {
      isShown: false,
      id: ""
    }
  }

}
