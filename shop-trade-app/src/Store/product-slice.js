import { createSlice  } from "@reduxjs/toolkit";

const initialState = {
    productList: [],
    filteredProductList: []
}

const productDataSlice = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {
        addProduct(state, action) {
            state.productList.push(...action.payload.productList);
            state.filteredProductList.push(...action.payload.productList); 
        },
        filterProduct(state, action) {
            let selectedCategory = action.payload.category;

            if(selectedCategory === "All-Products") {
                state.filteredProductList = state.productList;
            }
            else {
                state.filteredProductList = state.productList.filter(item => item.tag === selectedCategory);
            }
        }, 
        filterProductByPrice(state, action) {
            const productsList = action.payload.productsList;
            console.log(productsList);
        },
        searchProduct(state, action){
            let searchData = action.payload.enteredSearchInput;
            state.filteredProductList = state.productList.filter((product) => {
                return product.name.includes(searchData) || product.vendor.includes(searchData) || product.tag.includes(searchData);
            });
        }
               
    }
});

export const fetchCartData = () => {
    return async(dispatch) => {
       const fetchData = async() => {
           const response = await fetch("https://shop-trade-46795-default-rtdb.firebaseio.com/product_detail.json");
           if(!response.ok) {
            throw new Error("Not able to fetch data");
           }

            const data = await response.json();
            return data;   
       }

       try {
        const productList = await fetchData();
        let transformedProductList = [];

        for(let key in productList) {

            transformedProductList.push(productList[key]);   
        }
        
        dispatch(
            productDataActions.addProduct({
                productList: transformedProductList
            })
        )
       }
       catch(error) {
        console.log(error);
       }
       
    }
}

export const sorting = (sortOrder ,filteredProductList) => {
    console.log(filteredProductList, sortOrder);
    return (dispatch) => {
        dispatch(
            productDataActions.filterProductByPrice({
                productsList: filteredProductList
            })
        )
    }
 

}

export const productDataActions = productDataSlice.actions;

export default productDataSlice;