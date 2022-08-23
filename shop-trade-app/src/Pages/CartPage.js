import Cart from "../Components/Cart/index";
import { useSelector } from "react-redux";

const CartPage = () => {
    const cartProductList = useSelector(state => state.cartProductList);
    // const allProductList = useSelector(state => state.productList);


    return (
        <div>
            <Cart productList={cartProductList}/>

        </div>
    );
}

export default CartPage;