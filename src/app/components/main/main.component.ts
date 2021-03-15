import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import UserInterface from 'src/app/interfaces/user.interface';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutDataService } from 'src/app/services/checkout-data.service';
import { ProductDataService } from 'src/app/services/product-data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public currUser: UserInterface
  
  constructor(public _auth: AuthService, public _products: ProductDataService, public _cart: CartService) { }

  ngOnInit(): void {
  }
}
