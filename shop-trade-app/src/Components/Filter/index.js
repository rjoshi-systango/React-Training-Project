import CategoryFilter from "./CategoryFilter";
import classes from './index.module.css';
import PriceFilter from "./PriceFilter";
import ProductCounter from "./ProductCounter";

const FilterArea = () => {
    return (
        <div>
            <ProductCounter />

            <div className={classes.filter_option}>
                <CategoryFilter />
                <PriceFilter />
            </div>

        </div>

    )
}

export default FilterArea;