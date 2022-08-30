import ProductPrice from "./ProductPrice";
import classes from'./ProductDescription.module.css';

const ProductDescription = (props) => {
    const {productInformation} = props;
    return (
        <div className={`px-2`} onClick={props.onClick}>
            <p className={`${classes.product_brand_name} m-0`}>{productInformation.vendor}</p>
            <p className={`${classes.product_description} m-0`}>{productInformation.name}</p>
            <ProductPrice productInformation={productInformation}/>
        </div>
    )
}

export default ProductDescription; 