import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    totalPrice: 0,
    totalProduct: 0,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const productToAdd = action.payload.product;
            const productQuantity = productToAdd.quantity || 1;
            if (!state.products) {
                state.products = [{ ...productToAdd, quantity: productQuantity }];
            } else {
                const existingProduct = state.products.find(
                    product => product._id === productToAdd._id
                );

                if (existingProduct) {
                    existingProduct.quantity += productQuantity;
                } else {
                    state.products.push({ ...productToAdd, quantity: productQuantity });
                }
            }
            state.totalProduct += productQuantity;
            if (!state.totalPrice) {
                state.totalPrice = productToAdd.price * productQuantity;
            } else {
                state.totalPrice += productToAdd.price * productQuantity;
            }
        },
        reduceProduct: (state, action) => {
            state.products = state.products.filter(product => product.id !== action.payload.id)
            state.totalPrice -= action.payload.productAmount
            state.totalPrice -= action.payload.productPrice
        },
        setCart:(state,action)=>{
            return action.payload
        }
    }
})

export const { addProduct, reduceProduct,setCart } = cartSlice.actions
export default cartSlice.reducer