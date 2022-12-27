import CartItem from "../CartItem/CartItem";
import { Wrapper } from "./Cart.styles";
import { CartItemType } from "../App";

type CartProps = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  // When we remove something, we don't need to add any items so we return nothing (void)
  removeFromCart: (id: number) => void;
};

const Cart = ({ cartItems, addToCart, removeFromCart }: CartProps) => {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce(
      (accumulator: number, item) => accumulator + item.amount * item.price,
      0
    );
  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in Cart</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <p>Total Price: ${calculateTotal(cartItems).toFixed(2)}</p>
    </Wrapper>
  );
};

export default Cart;
