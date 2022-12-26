import { useState } from "react";
import { useQuery } from "react-query";
// Components
import Item from "./Item/Item";
import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";
// Styles
import { Wrapper } from "./App.styles";
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
  // ("products") is the query string we can name it whatever we want
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );

  const getTotalItems = () => null;

  const handleAddToCart = (clickedItem: CartItemType) => null;

  const handleRemoveFromCart = () => null;

  // While loading, a bar will display above the window to show that items are loading
  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong...</div>;

  return (
    <Wrapper>
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
