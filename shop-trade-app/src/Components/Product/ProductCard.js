import classes from './ProductCard.module.css';
import FavouriteButton from '../FavouriteButton/index';

const ProductCard = (props) => {
    const productInformation = props.productInformation;
    const discountPercentage = 100 - ((productInformation.price * 100) / productInformation.compare_at_price);
    return (
        <div className={`${classes.product_card} col-12 col-sm-4 col-md-3 col-lg-2 px-2  `}>
            <div className={classes.product_card_inner}>
                <div className={classes.product_image_box_main}>
                    <FavouriteButton id={productInformation.id} />
                    <div className={classes.image_box}>
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