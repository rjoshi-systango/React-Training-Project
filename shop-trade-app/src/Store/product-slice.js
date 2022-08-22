import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productList: [],
    filteredProductList: [],
    favouriteProductList: [],
    isFavourite: false,
    cartProductList: [],
}

const productDataSlice = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {
        addProduct(state, action) {
            state.productList.push(...action.payload.productList);
            state.filteredProductList.push(...action.payload.productList);
        },
        addFavouriteProduct(state, action){
            state.favouriteProductList.push(...action.payload.favouriteProductList);
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
        searchProduct(state, action){
            let searchData = action.payload.enteredSearchInput;
            state.filteredProductList = state.productList.filter((product) => {
                return product.name.includes(searchData) || product.vendor.includes(searchData) || product.tag.includes(searchData);
            });
        },
        addFavouriteItem(state, action){
            // console.log(action.payload);
            state.favouriteProductList.push(action.payload.productId);
        },
        removeFavouriteItem(state, action){
            state.favouriteProductList = state.favouriteProductList.filter((id) => {
                id = parseInt(id) 
                action.payload.productId = parseInt(action.payload.productId);

                return id!==action.payload.productId;
            })
        },
        changeState(state, action) {
            state.isFavourite = action.payload.isFavourite;
        },
        addCartItem(state, action){
            state.cartProductList.push(...action.payload.cartProductList);
        },
        addToCart(state, action) {
            const selectedProductId = action.payload.productId;
            const selectedProductSizeId = action.payload.sizeId;
            // console.log(selectedProductId);
            const { productInformation } = action.payload;
            let isExistingId;
            state.cartProductList.forEach((product) => {
                // console.log(product);
                if(product.id === productInformation.id && product.sizeId === productInformation.sizeId) {
                    // console.log("MATCH");
                    isExistingId = true;
                }
            });
            if(isExistingId) {
                for(let index in state.cartProductList) {
                    // console.log(index);
                    state.cartProductList[index].quantity +=1;
                }
                return;
               
            }
            state.cartProductList.push({ 
                id: selectedProductId,
                sizeId: selectedProductSizeId,
                quantity: 1
            });
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


export const fetchFavouriteData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch("https://shop-trade-46795-default-rtdb.firebaseio.com/favourite_product_detail.json");
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
                if(productList[key] !== null) {
                    transformedProductList.push(key);
                }
            }
            dispatch(
                productDataActions.addFavouriteProduct({
                    favouriteProductList: transformedProductList
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

export const changeFavouriteState = (productId, request) => {
    return async(dispatch) => {
        const httpReq = async() => {
            let response;
            if(request === 'POST') {
                response = await fetch(`https://shop-trade-46795-default-rtdb.firebaseio.com/favourite_product_detail/${productId}.json`, {
                    method: request,
                    body: JSON.stringify(true)
                });
            }
            else if(request === 'DELETE') {
                response = await fetch(`https://shop-trade-46795-default-rtdb.firebaseio.com/favourite_product_detail/${productId}.json`, {
                    method: request
                });
            }
            if(!response.ok) {
                throw new Error(`failed http '${request}' request`);
            }
            const data = await response.json();
            return data;
        }

        try{
            httpReq();
        
                if(request === 'POST') {
                    dispatch(productDataActions.addFavouriteItem({ productId: productId }))
                }
                else if(request === 'DELETE') {
                    dispatch(productDataActions.removeFavouriteItem({ productId: productId }))
                }
             }
        
        catch(error) {console.log(error);}
    }
}

export const fetchCartProductList = () => {
    return async(dispatch) => {
        const fetchData = async() => {
            const response = await fetch('https://shop-trade-46795-default-rtdb.firebaseio.com/cart_product_detail.json')
            if(!response.ok) {
                throw new Error("Failed to fetch cart product list");
            }
            const data = await response.json();
            return data;
        }

        try{
            const cartProductList = await fetchData();
            console.log(cartProductList);
            // dispatch(
            //     productDataActions.addCartItem({
            //         cartProductList: cartProductList
            //         })
            //     )

        } catch(error) {
            console.log(error);
        }
    }
}


export const addToCartDB = (productInformation) => {
    return async(dispatch) => {
        const sendData = async() => {
            const response = await fetch('https://shop-trade-46795-default-rtdb.firebaseio.com/cart_product_detail.json', {
                method: 'POST',
                body: JSON.stringify(productInformation)
            })
            if(!response.ok) {
                throw new Error("failed to send user cart data");
            }
            const data = response.json();
            return data;
        }
        try{
            await sendData();
            dispatch(productDataActions.addToCart({productInformation}));
        }catch(error){
            console.log(error);
        }

    }
}

export const productDataActions = productDataSlice.actions;

export default productDataSlice;