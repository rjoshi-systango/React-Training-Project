import classes from './ProductPrice.module.css';

const ProductPrice = (props) => {
    const {productInformation} = props;
    const discountPercentage = 100 - ((productInformation.price * 100) / productInformation.compare_at_price);

    return (
        <>
            <p className={`${classes.product_price} m-0`}>${productInformation.price}
                <strike className={classes.product_actual_price}>${productInformation.compare_at_price} </strike>
                <span className={classes.product_price_discount}>({discountPercentage.toFixed(0)}% OFF)</span>
            </p>
        </>
    )
}

export default ProductPrice;