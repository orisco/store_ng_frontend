export default interface CartItemInterface {
  _id: string,
  quantity: number,
  _cartId: string,
  _productId: [{
    _id: string,
    product_maker: string,
    product_name: string,
    description: string,
    price: number,
    image: string,
  }],
}