import { useState } from 'react';
import classes from './index.module.css';
import FavouriteButton from '../../FavouriteButton/index';
import ProductDescription from './ProductDescription';
import ProductPrice from './ProductPrice';
// import { addToCartDB } from '../../../Store/product-slice';
import { useDispatch, useSelector } from 'react-redux';
import { addCartNewProduct, updateProductQuanity } from '../../../Store/product-slice';
// import CartButton from '../../CartButton/index';

const ProductCard = (props) => {
    const productInformation = props.productInformation;
    const [isCardHover, setIsCardHover] = useState(false);
    const [isProductClicked, setIsProductClicked] = useState();
    const [isSizeSelected, setIsSizeSelected] = useState(false);
    const [selectedSize, setSelectedSize] = useState();;
    const cartProductList = useSelector(state => state.cartProductList);
    const dispatch = useDispatch();

    const mouseOverHandler = () => {
        setIsCardHover(true);
    }

    const mouseDownHandler = () => {
        setIsCardHover(false);
    }

    const productClickedHandler = () => {
        setIsProductClicked(true);
    }

    const sizeClickHandler = (event) => {
        // console.log(event.currentTarget.id);
        setSelectedSize(event.currentTarget.id);
        setIsSizeSelected(true);
        setIsProductClicked(false)
    }

    const addToCartClickHandler = () => {
        console.log(cartProductList);
        // console.log(selectedSize);
        
        let existingProduct = false;

        cartProductList.forEach((product) => {
            
            if (product.id === productInformation.id && product.sizeId === selectedSize) {
                existingProduct = true;
                let quantity = product.quantity + 1 
                console.log("existing");
                dispatch(updateProductQuanity(product.firebaseId, quantity ));
            }
        })

        if(!existingProduct) {
            console.log("new");
            let transformedInformation = {};
            transformedInformation = {...productInformation, sizeId: selectedSize, quantity: 1}
            dispatch(addCartNewProduct(transformedInformation));
        }

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

                {isProductClicked && !isSizeSelected &&
                    <div className='col d-flex flex-wrap' >
                        <h6 className={`${classes.size_seletbox} row w-100 m-0`}>Select size</h6>
                        {
                            productInformation.options.map((product) => {
                                return <div onClick={sizeClickHandler}
                                    
                                    className={` ${classes.size_option} col-auto mx-1 `}
                                    key={`${product.id} ${product.sizeId}`}
                                    id={product.id}>
                                    {product.value}
                                </div>
                            })
                        }
                    </div>
                }
                {isSizeSelected &&
                    <div className={`${classes.cartButton} `}>
                        <button onClick={addToCartClickHandler}
                            className={`${classes.cart_button}`} >
                            ADD TO CART
                        </button>
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