import { useState } from "react";
import { useQuery } from "react-query";
// Material UI components
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

  if (!isLoading) console.log(data);

  return <div>Start</div>;
}

export default App;
