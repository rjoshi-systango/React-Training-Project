import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogin: false,
    token: '',
    isLoginPage: false,
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
        setIsLoginPage(state, action){
            state.isLoginPage = !state.isLoginPage;
        },
        setToken(state, action) {
            console.log("set token");
            state.token = action.payload.token;
            state.isLogin = !!action.payload.token;
        },
        removeToken(state, action) {
            state.token = '';
            state.isLogin = false;
            state.favouriteProductList = [];
            state.cartProductList = [];
        },
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
        filterProuductByPrice(state, action){   
            console.log(action.payload.sort);
            const { sort } = action.payload;
            if(sort === 'low-to-high') {
                console.log("LOW");
                state.filteredProductList.sort(function(a, b){return a.price - b.price});
            }
            else if(sort === 'high-to-low') {
                console.log("HIGH");
                state.filteredProductList.sort(function(a, b){return b.price - a.price});

            }

        },
        searchProduct(state, action){
            let searchData = action.payload.enteredSearchInput;
            state.filteredProductList = state.productList.filter((product) => {
                return product.name.includes(searchData) || product.vendor.includes(searchData) || product.tag.includes(searchData);
            });
        },
        addFavouriteItem(state, action){
            // console.log(action.payload.cartProductList);
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
            // console.log(action.payload.cartProductList);
            state.cartProductList.push(...action.payload.cartProductList);
        },
        addToCart(state, action) {
            const {productInformation } = action.payload;
            state.cartProductList.push(productInformation);

        }, 
        updateQuantity(state, action) {
            //change the quantity of product
            const { firebaseId, quantity } = action.payload;
            // console.log(firebaseId);
            // console.log(quantity);
            // console.log(state.cartProductList);
            state.cartProductList.forEach((product) => {
                if(product.firebaseId === firebaseId) {
                    product.quantity = quantity;
                }
            })

        },
        removeCartProduct(state, action) {
            const {firebaseId} = action.payload;
            state.cartProductList = state.cartProductList.filter((product) => {
                return product.firebaseId !== firebaseId ;
            })
        },
        changeAuthState(state, action){
            console.log("change");
            state.isLogin = true;
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
    let email = localStorage.getItem('email');
    email = email.split('.')[0];
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(`https://shop-trade-46795-default-rtdb.firebaseio.com/users/${email}/favourite_product_detail.json`);
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
    let email = localStorage.getItem('email');
    email = email.split('.')[0];
    return async(dispatch) => {
        const httpReq = async() => {
            let response;
            if(request === 'POST') {
            response = await fetch(`https://shop-trade-46795-default-rtdb.firebaseio.com/users/${email}/favourite_product_detail/${productId}.json`, {
                    method: request,
                    body: JSON.stringify(true)
                });
            }
            else if(request === 'DELETE') {
                response = await fetch(`https://shop-trade-46795-default-rtdb.firebaseio.com/users/${email}/favourite_product_detail/${productId}.json`, {
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
    let email = localStorage.getItem('email');
    email = email.split('.')[0];
    return async(dispatch) => {
        const fetchData = async() => {
            const response = await fetch(`https://shop-trade-46795-default-rtdb.firebaseio.com/users/${email}/cart_product_detail.json`)
            if(!response.ok) {
                throw new Error("Failed to fetch cart product list");
            }
            const data = await response.json();
            return data;
        }

        try{
            const cartProductList = await fetchData();
            // console.log(cartProductList);
            let transformedCartProductList = [];
            for(let index in cartProductList) {
                // console.log(cartProductList[index]);
                transformedCartProductList.push({ ...cartProductList[index], firebaseId: index});

            }
            // console.log(transformedCartProductList);
            dispatch(
                productDataActions.addCartItem({
                    cartProductList: transformedCartProductList
                    })
                )

        } catch(error) {
            console.log(error);
        }
    }
}


export const addToCartDB = (productInformation) => {
    let email = localStorage.getItem('email');
    email = email.split('.')[0];
    return async(dispatch) => {
        const sendData = async() => {
            const response = await fetch(`https://shop-trade-46795-default-rtdb.firebaseio.com/users/${email}/cart_product_detail.json`, {
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

export const deleteCartProduct = (firebaseId) => {
    let email = localStorage.getItem('email');
    email = email.split('.')[0];
    return async(dispatch) => {
        const deleteData = async() => {
            const response = await fetch(`https://shop-trade-46795-default-rtdb.firebaseio.com/users/${email}/cart_product_detail/${firebaseId}.json`, {
                method: "DELETE"
            })
            if(!response.ok) {
                throw new Error("failed to delete product from cart");
            }
            const data = await response.json();
            return data;
        }
        try{
            await deleteData();
            dispatch(productDataActions.removeCartProduct({
                firebaseId
            }))

        }catch(error){

        }
    }
}

export const addCartNewProduct = (productInformation) => {
    let email = localStorage.getItem('email');
    email = email.split('.')[0];
    return async(dispatch) => {
        const sendData = async() => {
            const response = await fetch(`https://shop-trade-46795-default-rtdb.firebaseio.com/users/${email}/cart_product_detail.json`, {
                method: "POST",
                body: JSON.stringify(productInformation)
            });
            if(!response.ok) {
                throw new Error("failed to send new cart product data");
            }
            const data = response.json();
            return data;
        }
        try{
            const result = await sendData();
            console.log(result.name);
            const tranformedData = {...productInformation, firebaseId: result.name};
            dispatch(productDataActions.addToCart({ productInformation: tranformedData }))
        }catch(error){
            console.log(error);
        }
    }
}

export const updateProductQuanity = (firebaseId, quantity) => {
    let email = localStorage.getItem('email');
    email = email.split('.')[0];
    return async(dispatch) => {
        const updateData = async() => {
            const response = await fetch(`https://shop-trade-46795-default-rtdb.firebaseio.com/users/${email}/cart_product_detail/${firebaseId}.json`,{
                method: "PATCH",
                body: JSON.stringify({quantity})

            });
            if(!response.ok) {
                throw new Error(`failed to update cart data quantity`);
            }
            const data = response.json();
            return data;
        }
        try{
            await updateData();
            // console.log(result);
            dispatch(productDataActions.updateQuantity({firebaseId, quantity}));
            

        } catch(error){
            console.log(error);
        }
    }
}

export const productDataActions = productDataSlice.actions;

export default productDataSlice;