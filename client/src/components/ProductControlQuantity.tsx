import { useState } from "react";
import Button from "@mui/material/Button";
import { setCreateOrder } from "../redux/createOrderSlice";
import { useDispatch, useSelector } from "react-redux";



const ProductControlQuantity = ({ id }: any) => {

  // const createOrder = useSelector((state: any) => state.createOrder.createOrder);

  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(0);
  const orderObj = { [id]: quantity };
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };


  dispatch(setCreateOrder(orderObj));

  return (
    <>
      <Button variant="outlined" onClick={decreaseQuantity}>-</Button>
      <span>{quantity}</span>
      <Button variant="outlined" onClick={increaseQuantity}>+</Button>
    </>
  );
};

export default ProductControlQuantity;
