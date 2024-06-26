import { createSlice } from "@reduxjs/toolkit";
import  secureLocalStorage  from  "react-secure-storage";

const initialState = {
  wishlist: JSON.parse(secureLocalStorage.getItem("wishlist")) || [],
  totalQuantity: 0,
  totalPrice: 0,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.wishlist.find(
        (itemWishlist) => itemWishlist.id === id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.wishlist.push({ ...action.payload });
      }

      secureLocalStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },

    removeWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (itemWishlist) => itemWishlist.wlId !== action.payload
      );

      secureLocalStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },

    getWishlistTotal: (state) => {
      state.totalQuantity = state.wishlist.reduce(
        (total, itemWishlist) => total + itemWishlist.quantity,
        0
      );

      state.totalQuantity = state.totalQuantity <= 0 ? "" : Number(state.totalQuantity);
    },
  },
});

export const { addToWishlist, removeWishlist, getWishlistTotal } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
