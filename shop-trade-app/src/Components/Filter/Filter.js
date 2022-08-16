import FilterCategory from "./FilterCategory";
import classes from './Filter.module.css';
import { useSelector } from "react-redux";

const FilterArea = () => {
    const totalProduct = useSelector(state => state.filteredProductList.length);
    return (
        <div>
            <div class={`${classes.product_stats} container-fluid d-flex flex-column flex-sm-row`}>
                <p class={classes.product_stats_heading}>All Product</p>
                <p class={`${classes.product_stats_stats} mx-2`}>({totalProduct} Products)</p>
            </div>

            
            <div class="container-fluid d-flex">
                <p class={classes.filter_heading}>FILTERS :</p>
                <FilterCategory  />
                
            </div>
        </div>
      
    )
}

export default FilterArea;