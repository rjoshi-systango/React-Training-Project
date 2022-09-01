import classes from "./PriceFilter.module.css";
import { useDispatch } from 'react-redux';
import { productDataActions } from "../../Store/product-slice";

const PriceFilter = () => {
    const dispatch = useDispatch();

    const categoryChangeHandler = (event) => {
        const sortBy = event.target.value;
        if (sortBy) {
            dispatch(productDataActions.filterProuductByPrice({
                sort: sortBy
            }));
        }
    }

    return (
        <div className={"classes.price_filter"}>
            <button className={classes.button}>Sort By :
                <select name="" id="" className={classes.select_option} onChange={categoryChangeHandler}>
                    <option value style={{ textAlign: "center" }}>-------Select--------  </option>
                    <option value="low-to-high">Price Low To High</option>
                    <option value="high-to-low">Price High To Low</option>
                </select>
            </button>
        </div>


    )
}


export default PriceFilter;