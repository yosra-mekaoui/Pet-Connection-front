import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-toastify";
const initialState = {
<<<<<<< HEAD
<<<<<<< HEAD
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")): [],
=======
>>>>>>> ee347506aec4a2318022edffa450cb6f1f699215
=======
>>>>>>> ee347506aec4a2318022edffa450cb6f1f699215
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action){

           const itemIndex = state.cartItems.findIndex(
            (item) => item.id === action.payload.id
            );
            if (itemIndex >=0){
                state.cartItems[itemIndex].cartQuantity += 1;
                toast.info("increased product quantity", {
                    position: "bottom-left",
                });
            } else{
                const tempProduct = {...action.payload, cartQuantity: 1 };
                state.cartItems.push(tempProduct);
                toast.success(`${action.payload.name} added to cart`, {
                    position: "bottom-left",
                });
            }
           localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
    },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
