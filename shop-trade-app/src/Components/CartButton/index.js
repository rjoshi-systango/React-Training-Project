import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
// import { faCartShopping as faCartShoppingEmpty } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from '../../Store/product-slice';
import { productDataActions } from "../../Store/product-slice"; 

const CartButton = (props) => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cartProductList);

    console.log(cart);
    const addToCartHandler = () => {
        console.log("add to cart");
        console.log(props.id);
        dispatch(productDataActions.addToCart({ productId: props.id }))
    }
    return (
        <div >
            <FontAwesomeIcon icon={faCartShopping} onClick={addToCartHandler}/>
        </div>
    )
}

export default CartButton;