import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import CategoryInterface from 'src/app/interfaces/categories.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ProductDataService } from 'src/app/services/product-data.service';

@Component({
  selector: 'app-by-categories',
  templateUrl: './by-categories.component.html',
  styleUrls: ['./by-categories.component.scss']
})
export class ByCategoriesComponent implements OnInit {

  public myForm: FormGroup

  constructor(public _product: ProductDataService, public _fb: FormBuilder, public _auth: AuthService) { }

  ngOnInit(): void {
    this.myForm = this._fb.group({
      price: [""]
    })
   
    this._product.getCategories().subscribe((res: CategoryInterface[]) => {
      this._product.categories = res;
    })
    this._product.getBrandsName().subscribe((res: any) => {
      this._product.brands = res;
    })
  }

  public getProductsByPrice(){
    let numbers = this.myForm.value.price
    numbers = numbers.split(",")
    let range = {
      gt: numbers[0],
      lt: numbers[1]
    }
    this._product.getProductsByPrice(range).subscribe((res:any) => {
      this._product.allProducts = res;
    })
  }

  public getProductsByBrand(brand) {
    this._product.getProductsByBrandName(brand).subscribe((res: any) => {
      this._product.allProducts = res
    })
  }
}
