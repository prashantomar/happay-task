import { createSlice } from "@reduxjs/toolkit";
import { changeNameToCaps } from "../../utils";

const initialState = {
  value: [],
};
// storing in local store
const saveToLocal =(obj) => localStorage.setItem('productsList',JSON.stringify(obj))

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    loadList: (state, p) => {
      state.value = [...p.payload.map((e) => ({ ...e,name:changeNameToCaps(e.name) }))];
      saveToLocal(state.value)
    },
    addToCart: (state, p) => {
      const { payload: { id, quantity }} = p;
      const i = state.value.findIndex((e) => e.id === id);
      state.value = [
        ...state.value.slice(0, i),
        {
          ...state.value[i],
          quantity: quantity + 1,
        },
        ...state.value.slice(i + 1),
      ];
      saveToLocal(state.value)
    },
    reduceFromCart: (state, p) => {
      const { payload: { id, quantity } } = p;
      const i = state.value.findIndex((e) => e.id === id);
      state.value = [
        ...state.value.slice(0, i),
        {
          ...state.value[i],
          quantity: quantity > 0 ? quantity - 1 : 0,
        },
        ...state.value.slice(i + 1),
      ];
      saveToLocal(state.value)
    },
  },
});
export const { loadList, addToCart, reduceFromCart } = productSlice.actions;
export const getList = (state) => state.product.value;
export default productSlice.reducer;
