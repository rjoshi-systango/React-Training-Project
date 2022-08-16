import { configureStore} from "@reduxjs/toolkit";
import productDataSlice from "./product-slice";


const store = configureStore({
    reducer: productDataSlice.reducer
})

export default store;