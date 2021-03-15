import { Injectable } from '@angular/core';
import CategoryInterface from '../interfaces/categories.interface';
import ProductInterface from '../interfaces/products.interface';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  //detailed product
  public detailedProduct: ProductInterface
  public detailedProductDisplay: boolean = false;
  public byCategory = false;
  public search = false;
  public brands = [];
  public allProducts: ProductInterface[]
  public categories: CategoryInterface[]
  
  // amount selection
  public addToCart = {
    isShown: false,
    id: ""
  };

  constructor(private _rq: WebRequestService) { }

  // get all categories
  getCategories(){
    return this._rq.get("product/categories")
  }

  // get all products
  getProducts(){
    return this._rq.get("product/products").subscribe((res: any) => {
      this.allProducts = res
    })
  }

  // search products
  searchProducts(body) {
    return this._rq.post('product/products/search', body)
  }

  // get products by category id
  getProductsByCategory(categoryId) {
    return this._rq.get(`product/products/${categoryId}`).subscribe((res: ProductInterface[]) => {
      this.allProducts = res
    })
  }

  // get products by price
  getProductsByPrice(body){
    return this._rq.post('product/products/price-sort', body)
  }

  // get brand names
  getBrandsName() {
    return this._rq.get('product/brand')
  }

  // get products by brand name
  getProductsByBrandName(brand) {
    return this._rq.get(`product/brand/${brand}`)
  }


  // get total number of products in store
  getProductsCount(){
    return this._rq.get('product/count')
  }
}
