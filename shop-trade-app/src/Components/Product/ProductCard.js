import classes from './ProductCard.module.css';
import FavouriteButton from '../FavouriteButton/index';
import { useState } from 'react';

const ProductCard = (props) => {
    const [isCardHover, setIsCardHover]= useState(false);
    const productInformation = props.productInformation;
    const discountPercentage = 100 - ((productInformation.price * 100) / productInformation.compare_at_price);
    let count = 0;

    const mouseOverHandler = () => {
        setIsCardHover(true);
    }

    const mouseDownHandler = () => {
        setIsCardHover(false);
    }
    
    props.favouriteProductId.forEach((productId) => {
        if(props.productInformation.id === productId.id) {
            count += 1;
        }
    })

    return (
        <div className={`${classes.product_card} col-12 col-sm-4 col-md-3 col-lg-2 px-2  `} onMouseLeave={mouseDownHandler} onMouseOver={mouseOverHandler}>
            <div className={classes.product_card_inner}>
                <div className={classes.product_image_box_main}>
                    
                    <div className={classes.image_box}>
                        {isCardHover && <FavouriteButton id={productInformation.id} isFavourite={count>0? true : false}/>}
                        <img src={productInformation.image_src[0]} className='img-fluid' alt="lgo" />
                    </div>
                </div>
                <div className={`${classes.mini_description_box} px-2`}>
                    <p className={`${classes.product_brand_name} m-0`}>{productInformation.vendor}</p>
                    <p className={`${classes.product_description} m-0`}>{productInformation.name}</p>
                    <p className={`${classes.product_price} m-0`}>${productInformation.price}
                        <strike className={classes.product_actual_price}>${productInformation.compare_at_price} </strike>
                        <span className={classes.product_price_discount}>({discountPercentage}% OFF)</span>
                    </p>
                </div>

            </div>
        </div>
    );
}

export default ProductCard;