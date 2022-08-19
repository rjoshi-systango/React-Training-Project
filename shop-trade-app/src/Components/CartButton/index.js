import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { productDataActions } from "../../Store/product-slice"; 

const CartButton = (props) => {
    const dispatch = useDispatch();

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