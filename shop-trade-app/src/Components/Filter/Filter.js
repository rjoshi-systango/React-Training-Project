import FilterCategory from "./FilterCategory";
import classes from './Filter.module.css';
import { useSelector } from "react-redux";
import PriceFilter from "./PriceFilter";

const FilterArea = () => {
    const totalProduct = useSelector(state => state.filteredProductList.length);
    return (
        <div>
            <div className={`${classes.product_stats} container-fluid d-flex flex-column flex-sm-row`}>
                <p className={classes.product_stats_heading}>All Product</p>
                <p className={`${classes.product_stats_stats} mx-2`}>({totalProduct} Products)</p>
            </div>

            <div className={classes.filter_option}>
                <div className="container-fluid d-flex">
                    <p className={classes.filter_heading}>FILTERS :</p>
                    <FilterCategory />
                </div>

                <div className={classes.price_filter}>
                    <PriceFilter />
                </div>
            </div>


        </div>

    )
}

export default FilterArea;