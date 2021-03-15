export default interface ProductInterface {
  _id: string,
  product_maker: string,
  product_name: string,
  description: string,
  detail?: string
  categoryId: string,
  price: number,
  image: string,
}