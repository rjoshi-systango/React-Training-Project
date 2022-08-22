import { useState } from 'react';
import classes from './index.module.css';
import FavouriteButton from '../../FavouriteButton/index';
import ProductDescription from './ProductDescription';
import ProductPrice from './ProductPrice';
import { addToCartDB } from '../../../Store/product-slice';
import { useDispatch } from 'react-redux';
// import CartButton from '../../CartButton/index';

const ProductCard = (props) => {
    const [isCardHover, setIsCardHover] = useState(false);
    const [isProductClicked, setIsProductClicked] = useState(false);
    const [isAddToCartClicked, setIsAddToCartClicked] = useState(false);
    // const cartProductList = useSelector(state => state.cartProductList);
    const productInformation = props.productInformation;
    const dispatch = useDispatch();

    const mouseOverHandler = () => {
        setIsCardHover(true);
    }

    const mouseDownHandler = () => {
        setIsCardHover(false);
    }

    const productClickedHandler = (event) => {
        setIsProductClicked(true);
    }

    const addToCartClickHandler = () => {
        setIsProductClicked(false);
        setIsAddToCartClicked(true);
    }

    const clickHandler = (event) => {
        const sizeId = event.currentTarget.id;

        const transformedData = {
            sizeId, ...productInformation
        }

        dispatch(addToCartDB(transformedData));
        setIsAddToCartClicked(false);
    }

    return (
        <div className={`${classes.product_card}  col-12 col-sm-4 col-md-3 col-lg-2 px-2 h-100 mx-lg-3 mx-md-4 mx-sm-4 gy-4`}
            onMouseLeave={mouseDownHandler}
            onMouseOver={mouseOverHandler}
            onClick={productClickedHandler}
        >
            <div className={classes.product_card_inner}>
                <div className={classes.product_image_box_main}>

                    {isCardHover && <FavouriteButton id={productInformation.id} />}
                    <div className={classes.image_box}>
                        <img src={productInformation.image_src[0]} className='img-fluid card-img-top' alt="lgo" />
                    </div>
                </div>
                {isProductClicked && !isAddToCartClicked &&
                    <div className={`${classes.cartButton} `}>
                        <button onClick={addToCartClickHandler} className={`${classes.cart_button}`} > ADD TO CART</button>
                    </div>
                }
                {isAddToCartClicked &&
                    <div className='col d-flex' >
                        <h6 className='row' >Select size</h6>
                        {
                            productInformation.options.map((product) => {
                                return <div className={` ${classes.size_option} rounded-circle col-auto px-2 `} key={`${product.id} ${product.sizeId}`} onClick={clickHandler} id={product.id}>{product.value}</div>
                            })
                        }
                    </div>
                }

                {!isProductClicked &&
                    <ProductDescription productInformation={productInformation} />
                }
                {isProductClicked &&
                    <ProductPrice productInformation={productInformation} />
                }

            </div>
        </div>
    );
}

export default ProductCard;