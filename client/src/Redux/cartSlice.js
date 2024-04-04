import { createSlice } from "@reduxjs/toolkit";
import  secureLocalStorage  from  "react-secure-storage";

const initialState = {
  cart: JSON.parse(secureLocalStorage.getItem("cart")) || [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, quantity } = action.payload;
      const Item = state.cart.find((item) => item.id === id);

      if (Item) {
        Item.quantity += quantity;
      } else {
        state.Item.push({ ...action.payload });
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
