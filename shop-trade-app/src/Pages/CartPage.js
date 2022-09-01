import Cart from "../Components/Cart/index";
import { useSelector } from "react-redux";

const CartPage = () => {
    const cartProductList = useSelector(state => state.cartProductList);

    return (
        <div>
            <Cart productList={cartProductList} />

        </div>
    );
}

export default CartPage;