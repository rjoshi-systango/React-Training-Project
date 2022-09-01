import classes from "./index.module.css";
import logo from "../../Assests/img/systango_logo.jpeg";
import { useDispatch, useSelector } from 'react-redux';
import { productDataActions } from "../../Store/product-slice";
import { faHeart, faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import { useState } from "react";
import User from "./User";


const Header = () => {
    const favouriteProduct = useSelector(state => state.favouriteProductList);
    const cartProduct = useSelector(state => state.cartProductList);
    const [isSearchIconClicked, setIsSearchIconClicked] = useState(false);
    const [isToggleClick, setIsToggleClick] = useState(false);
    const isLogin = useSelector(state => state.isLogin);
    let toggleClass = isToggleClick ? 'collapse.show' : 'collapse';
    const dispatch = useDispatch();

    const searchInputChangeHandler = (event) => {
        const enteredSearchInput = event.target.value;
        dispatch(productDataActions.searchProduct({ enteredSearchInput }));
    }

    const searchClickHandler = () => {
        setIsSearchIconClicked((state) => !state);
    }

    const toggleClickHandler = () => {
        setIsToggleClick((state) => !state);
    }

    return (
        <div className="m-1">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <div className="logo">
                        <Link to='/'>
                            <img src={logo} alt={'logo'} className="navbar-brand" />
                        </Link>
                    </div>
                    <button type="button" className="navbar-toggler " >
                        <span className="navbar-toggler-icon" onClick={toggleClickHandler}></span>
                    </button>
                    <div className={` ${toggleClass}  navbar-collapse justify-content-between navbarCollapse`} >
                        <div className="d-flex flex-md-fill justify-content-center">
                            <div className="navbar-nav">
                                <div className="nav-item dropdown">
                                    <p className="nav-link dropdown-toggle m-2 text-dark" data-toggle="dropdown">Shop</p>
                                    <div className="dropdown-menu">
                                        {/* {option on shop click} */}
                                    </div>
                                </div>
                                <p className="nav-item nav-link m-2 text-dark">About Us</p>
                                <p className="nav-item nav-link m-2 text-dark" >Contact Us</p>
                                <p className="nav-item nav-link m-2 text-dark" >Our Stories</p>
                            </div>

                        </div>

                        <div className="navbar-nav align-items-center">
                            <div>
                                {!isSearchIconClicked &&
                                    <div className={`${classes.icon} me-3`}>
                                        <span>
                                            <FontAwesomeIcon icon={faSearch} onClick={searchClickHandler} />
                                        </span>
                                    </div>
                                }
                                {isSearchIconClicked &&
                                    <div className={`${classes.icon} me-3`}>
                                        <input type="text" className="form-control" placeholder="Search" onChange={searchInputChangeHandler} />
                                    </div>
                                }
                            </div>
                            <div>
                                {isLogin && <Link to="/favourite" >
                                    <div className={`${classes.icon} me-3`}>
                                        <span className="icon"><FontAwesomeIcon icon={faHeart} /></span>
                                        <span className={`${classes.icon_content} badge rounded-pill badge-notification bg-danger`}>{favouriteProduct.length}</span>
                                    </div>
                                </Link>}
                            </div>

                            {/* {} */}

                            <User />

                            <div>

                                {isLogin && <Link to='/cart' >
                                    <div className={`${classes.icon} me-3`} >
                                        <span ><FontAwesomeIcon icon={faShoppingCart} /></span>
                                        <span className={`${classes.icon_content} badge rounded-pill badge-notification bg-danger`}>{cartProduct.length}</span>
                                    </div>
                                </Link>}
                            </div>

                        </div>

                    </div>
                </div>
            </nav >
        </div >
    )
}

export default Header;