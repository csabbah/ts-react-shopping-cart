import { useState } from "react";
import { useQuery } from "react-query";
// Components
import Item from "./Item/Item";
import Cart from "./Cart/Cart";
import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";
// Styles
import { Wrapper, StyledButton } from "./App.styles";
// Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

// We use Promise since this is function return a Promise and we specify what it returns which is the Type above
const getProducts = async (): Promise<CartItemType[]> =>
  // Outside await for JSON
  // Inside await for fectch
  await (await fetch("https://fakestoreapi.com/products")).json();

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  // cartItems will be an array of items (which is of CartItemType type)
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  // ("products") is the query string we can name it whatever we want
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );

  // Iterate through all the items in the cart and add up the total amount in the cart
  // We can use {} + a return statement for Explicit or do an Implicit return by not using {}
  const getTotalItems = (items: CartItemType[]) =>
    // 'accumulator' will take an initial value of 0 which is set at the end of the reduce method
    items.reduce((accumulator: number, item) => accumulator + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      // Is it already in the cart?
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time adding the item
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    // setCartItems((prev) => {});
  };

  // While loading, a bar will display above the window to show that items are loading
  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong...</div>;

  return (
    // Wrapper is an exported Styled component 'App.styles.ts', it acts as a regular .CSS file
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        ></Cart>
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge
          overlap="rectangular"
          badgeContent={getTotalItems(cartItems)}
          color="error"
        >
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {!isLoading &&
          data?.map((item) => (
            <Grid item key={item.id} xs={12} sm={4}>
              {/* Reminder '<Item/>' is a component we created */}
              <Item item={item} handleAddToCart={handleAddToCart} />
            </Grid>
          ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
