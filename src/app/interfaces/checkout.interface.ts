import CartItemInterface from "./cartIems.interface";
import UserInterface from "./user.interface";

export default interface CheckoutInterface {
  _id?: string,
  customerId?: UserInterface
  _cartId?: string,
  _cartItem?: CartItemInterface[]
  finalPrice?: number,
  delivery_date?: string,
  order_date?: string,
  credit_card?: string
}
  