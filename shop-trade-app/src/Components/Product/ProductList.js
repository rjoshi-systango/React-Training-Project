import { useSelector } from "react-redux";
import FavouriteButton from "../FavouriteButton";
import classes from "./ProductList.module.css";

//   const D = [];
const ProductList = () => {
    const filteredProductList = useSelector(state => state.filteredProductList);

    return (
        <>
            {filteredProductList.map((product) => {
                const discountPercentage = 100 - ((product.price * 100) / product.compare_at_price);

                return (
                    <div className={`${classes.product_card} col-12 col-sm-4 col-md-3 col-lg-2 px-2  `}>
                        <div className={classes.product_card_inner}>
                            <div className={classes.product_image_box_main}>
                                <FavouriteButton id={product.id} />
                                <div className={classes.image_box}>
                                    <img src={product.image_src[0]} className='img-fluid' alt="lgo" />
                                </div>
                            </div>
                            <div className={`${classes.mini_description_box} px-2`}>
                                <p className={`${classes.product_brand_name} m-0`}>{product.vendor}</p>
                                <p className={`${classes.product_description} m-0`}>{product.name}</p>
                                <p className={`${classes.product_price} m-0`}>${product.price}
                                    <strike className={classes.product_actual_price}>${product.compare_at_price} </strike>
                                    <span className={classes.product_price_discount}>({discountPercentage}% OFF)</span>
                                </p>
                            </div>

                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default ProductList;