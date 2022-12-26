import Button from "@material-ui/core/Button";
// Types
import { CartItemType } from "../App";
// STyles
import { Wrapper } from "./Item.style";

type ItemProps = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};
// 'React.FC<ItemProps>' = 'FC' React Functional component
// Original method > const Item: React.FC<ItemProps> = ({ item, handleAddToCart }) => (
const Item = ({ item, handleAddToCart }: ItemProps) => (
  <Wrapper>
    <img src={item.image} alt={item.title}></img>
    <div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <h3>${item.price}</h3>
    </div>
    <Button onClick={() => handleAddToCart(item)}>Add to cart</Button>
  </Wrapper>
);

export default Item;
