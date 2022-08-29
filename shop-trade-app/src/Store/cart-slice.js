import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    total: 0, 
    tax: 0, 
    subTotal: 0,
    
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {

    }
});