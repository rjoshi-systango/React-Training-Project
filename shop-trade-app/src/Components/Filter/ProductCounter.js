import  classes from './ProductCounter.module.css';
import { useSelector } from "react-redux";

const ProductCounter = () => {
    const totalProduct = useSelector(state => state.filteredProductList.length);

    return (
        <div className={`${classes.product_stats} container-fluid d-flex flex-column flex-sm-row mt-3`}>
            <p className={classes.product_stats_heading}>All Product</p>
            <p className={`${classes.product_stats_stats} mx-2`}>({totalProduct} Products)</p>
        </div>
    )
}

export default ProductCounter;