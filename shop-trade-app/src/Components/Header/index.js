import classes from "./index.module.css";
import logo from "../../Assests/img/systango_logo.jpeg";
import { useDispatch, useSelector } from 'react-redux';
import { productDataActions } from "../../Store/product-slice";
import { faHeart, faUser, faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import { useState } from "react";


const Header = () => {
    const favouriteProduct = useSelector(state => state.favouriteProductList);
    const cartProduct = useSelector(state => state.cartProductList);
    const [isSearchIconClicked, setIsSearchIconClicked] = useState(false);
    const [isToggleClick, setIsToggleClick] = useState(false);
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
                                <Link to="/favourite" >
                                    <div className={`${classes.icon} me-3`}>
                                        <span className="icon"><FontAwesomeIcon icon={faHeart} /></span>
                                        <span className={`${classes.icon_content} badge rounded-pill badge-notification bg-danger`}>{favouriteProduct.length}</span>
                                    </div>
                                </Link>
                            </div>
                        
                        <div className={`${classes.icon} me-3`} >
                            <FontAwesomeIcon icon={faUser} />

                        </div>

                        <div>

                            <Link to='/cart' >
                                <div className={`${classes.icon} me-3`} >
                                    <span ><FontAwesomeIcon icon={faShoppingCart} /></span>
                                    <span className={`${classes.icon_content} badge rounded-pill badge-notification bg-danger`}>{cartProduct.length}</span>
                                </div>
                            </Link>
                        </div>

                    </div>

                </div>
        </div>
            </nav >
        </div >
        // <header classNameName={`${classNamees.header} ` }>
        //     <Link to="/">
        //         <div classNameName={classNamees.img_logo_box}>
        //             <img src={logo} alt="logo"/>
        //         </div>  
        //     </Link>
        //     <div classNameName={classNamees.header_center}>
        //         <p classNameName={classNamees.header_center_content}>Shop</p>
        //         <p classNameName={classNamees.header_center_content}>About us</p>
        //         <p classNameName={classNamees.header_center_content}>Our Stories</p>
        //         <p classNameName={classNamees.header_center_content}> Contact Us</p>
        //     </div>
        //     <div classNameName={classNamees.header_right}>
        //         {!isSearchIconClicked && 
        //         <p classNameName={classNamees.header_left_content} >

        //             <FontAwesomeIcon icon={faSearch} onClick={searchClickHandler}/>
        //         </p>
        //         }
        //         {isSearchIconClicked &&
        //             <input type="text" classNameName={classNamees.header_left_content} placeholder="search" onChange={searchInputChangeHandler}/>
        //         }


        //         <Link to="/favourite">
        //             <p classNameName={classNamees.header_left_content} >
        //                 <FontAwesomeIcon icon={faHeart} />
        //                 <sup>{favouriteProduct.length}</sup>
        //             </p>
        //         </Link>
        //         <p classNameName={classNamees.header_left_content}>
        //             <FontAwesomeIcon icon={faUser} />
        //         </p>
        //         <Link to='/cart' >
        //             <p classNameName={classNamees.header_left_content}>
        //                 <FontAwesomeIcon icon={faShoppingCart} />
        //                 <sup>{cartProduct.length}</sup>
        //             </p>
        //         </Link>
        //     </div>
        // </header>
    )
}

export default Header;