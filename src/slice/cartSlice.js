import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [{}],
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
            if (!state?.products) {
                state = {...state,products:[]}
                state.products.push({ ...productToAdd, quantity: productQuantity });
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
            if (!state?.totalPrice) {
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
        setCart: (state, action) => {
            return action.payload
        },
        changeQuantity: (state, action) => {
            const productTochange = state.products.find(product => product._id === action.payload.id)
            const quantityChanged = action.payload.intQuantity - productTochange?.quantity
            console.log(quantityChanged);
            if (productTochange) {
                productTochange.quantity = action.payload.intQuantity;
            }
            if (quantityChanged > 0) {
                console.log(quantityChanged);
                state.totalProduct += quantityChanged;
                state.totalPrice += productTochange.price * quantityChanged;
            }
            else {
                console.log(quantityChanged);
                state.totalProduct += quantityChanged;
                state.totalPrice += productTochange.price * quantityChanged;
            }
        }
    }
})

export const { addProduct, reduceProduct, setCart, changeQuantity } = cartSlice.actions
export default cartSlice.reducer