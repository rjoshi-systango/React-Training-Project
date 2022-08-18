import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productList: [],
    filteredProductList: [],
    favouriteProductList: []
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

            if (selectedCategory === "All-Products") {
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
        searchProduct(state, action) {
            let searchData = action.payload.enteredSearchInput;
            state.filteredProductList = state.productList.filter((product) => {
                return product.name.includes(searchData) || product.vendor.includes(searchData) || product.tag.includes(searchData);
            });
        },
        addFavouriteItem(state, action) {
            const favouriteList = action.payload.favouriteList;
            state.favouriteProductList.push(...favouriteList);
        }
    }
});

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch("https://shop-trade-46795-default-rtdb.firebaseio.com/product_detail.json");
            if (!response.ok) {
                throw new Error("Not able to fetch data");
            }

            const data = await response.json();
            return data;
        }

        try {
            const productList = await fetchData();
            let transformedProductList = [];

            for (let key in productList) {

                transformedProductList.push(productList[key]);
            }

            dispatch(
                productDataActions.addProduct({
                    productList: transformedProductList
                })
            )
        }
        catch (error) {
            console.log(error);
        }

    }
}

export const sorting = (sortOrder, filteredProductList) => {
    console.log(filteredProductList, sortOrder);
    return (dispatch) => {
        dispatch(
            productDataActions.filterProductByPrice({
                productList: filteredProductList
            })
        )
    }
}

// //Delete item from favourite list 
// export const removeFavourite = (productId) => {
//     return async () => {
//         const deleteFavouriteId = async () => {
//             const response = await fetch(`https://shop-trade-46795-default-rtdb.firebaseio.com/favourite_product_detail/${productId}.json`, {
//                 method: 'DELETE'
//             })
//             if (!response.ok) {
//                 throw new Error('Failed to remove favourite product');
//             }
//             // const data = response.json();
//             // return data;
//         }
//         try {
//             const result = await deleteFavouriteId();
//             console.log(result);
//         }
//         catch (error) {
//             console.log(error);
//         }
//     }
// }

export const addFavourite = (productId) => {
    return async(dispatch) => {
        const sendData = async () => {

            const response = await fetch("https://shop-trade-46795-default-rtdb.firebaseio.com/favourite_product_detail.json", {
                method: "POST",
                body: JSON.stringify({ id: productId })
            });
            if (!response.ok) {
                throw new Error(`failed to add favourite ${productId}`);
            }
            const data = await response.json();
            return data;
        }
        try {
            sendData();
        }
        catch (error) {
            console.log(error);
        }
    }
}


export const fetchFavouriteDetail = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch("https://shop-trade-46795-default-rtdb.firebaseio.com/favourite_product_detail.json");
            if (!response.ok) {
                throw new Error("Failed to fetch favourite data");
            }
            const data = await response.json();
            return data;
        }
        try {
            const favouriteList = await fetchData();
            let transformedFavouriteList = [];

            for (let key in favouriteList) {

                transformedFavouriteList.push(favouriteList[key]);
            }
            dispatch(
                productDataActions.addFavouriteItem({ favouriteList: transformedFavouriteList })
            )
        }
        catch (error) {
            console.log(error);
        }
    }
}


// export const addFavourite = (id) => {
//     return async(dispatch) => {
//         const sendData = async() => {

//             const response = await fetch("https://shop-trade-46795-default-rtdb.firebaseio.com/favourite_product_detail/-N9g2oaRQCUloGENg1ia/.json", {
//                 method: "PUT",
//                 body: JSON.stringify(id),
//             })
//             if (!response.ok) {
//                 throw new Error("Failed to send data");
//             }

//             let data = await response.json();
//             return data;
//         }

//         try{
//             const data = await sendData();
//             console.log(data);
//         }
//         catch {
//             console.log("error");
//         }
//     }
// }

export const productDataActions = productDataSlice.actions;

export default productDataSlice;