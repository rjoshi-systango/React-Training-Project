import classes from "./index.module.css";
import logo from "../../Assests/img/systango_logo.jpeg";
import { useDispatch, useSelector } from 'react-redux';
import { productDataActions } from "../../Store/product-slice";
import { faHeart, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom"; 


const Header = () => {
    const favouriteProduct = useSelector(state => state.favouriteProductList);
    const cartProduct = useSelector(state => state.cartProductList);

    const dispatch = useDispatch();

    const searchInputChangeHandler = (event) => {
        const enteredSearchInput = event.target.value;
        dispatch(productDataActions.searchProduct({ enteredSearchInput }));
    }

    return (
        <header className={`${classes.header} ` }>
            <Link to="/">
                <div className={classes.img_logo_box}>
                    <img src={logo} alt="logo"/>
                </div>  
            </Link>
            <div className={classes.header_center}>
                <p className={classes.header_center_content}>Shop</p>
                <p className={classes.header_center_content}>About us</p>
                <p className={classes.header_center_content}>Our Stories</p>
                <p className={classes.header_center_content}> Contact Us</p>
            </div>
            <div className={classes.header_right}>
                <input type="text" className={classes.header_left_content} placeholder="search" onChange={searchInputChangeHandler}/>
                <Link to="/favourite">
                    <p className={classes.header_left_content} >
                        <FontAwesomeIcon icon={faHeart} />
                        <sup>{favouriteProduct.length}</sup>
                    </p>
                </Link>
                <p className={classes.header_left_content}>
                    <FontAwesomeIcon icon={faUser} />
                </p>
                <Link to='/cart' >
                    <p className={classes.header_left_content}>
                        <FontAwesomeIcon icon={faShoppingCart} />
                        <sup>{cartProduct.length}</sup>
                    </p>
                </Link>
            </div>
        </header>
    )
}

export default Header;