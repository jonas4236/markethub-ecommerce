import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "../Redux/wishlistSlice";
import cartReducer from "../Redux/cartSlice";

export const store = configureStore({
  reducer: {
    allCart: cartReducer,
    allWishlist: wishlistReducer,
  },
});
