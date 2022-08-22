import Cart from "../Components/Cart/index";
import { useSelector } from "react-redux";

const CartPage = () => {
    const cartProductList = useSelector(state => state.cartProductList); 
    const allProductList = useSelector(state => state.productList);

    const transformedCartList = [];

    allProductList.forEach((product) => {
        cartProductList.forEach((cartProduct) => {
            if(product.id === cartProduct.id) {
                transformedCartList.push({
                    quantity: cartProduct.quantity, 
                    sizeId: cartProduct.sizeId, 
                    ...product
                })
            }
        })
    })

    console.log(transformedCartList);
    return (
        <div>
            <Cart productList={transformedCartList}/>
        </div>
    );
}

export default CartPage;