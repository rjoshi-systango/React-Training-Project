import classes from "./index.module.css";
import logo from "../../Assests/img/systango_logo.jpeg";
import { useDispatch } from 'react-redux';
import { productDataActions } from "../../Store/product-slice";

const Header = () => {
    const dispatch = useDispatch();
    const searchInputChangeHandler = (event) => {
        const enteredSearchInput = event.target.value;
        dispatch(productDataActions.searchProduct({ enteredSearchInput }));
    }

    return (
        <header className={`${classes.header} ` }>
            <div className={classes.img_logo_box}>
                <img src={logo} alt="logo"/>
            </div>
            <div className={classes.header_center}>
                <p className={classes.header_center_content}>Shop</p>
                <p className={classes.header_center_content}>About us</p>
                <p className={classes.header_center_content}>Our Stories</p>
                <p className={classes.header_center_content}> Contact Us</p>
            </div>
            <div className={classes.header_right}>
                <input type="text" className={classes.header_left_content} placeholder="search" onChange={searchInputChangeHandler}/>
                <p className={classes.header_left_content}>Profile</p>
                <p className={classes.header_left_content}>Cart</p>
            </div>
        </header>
    )
}

export default Header;