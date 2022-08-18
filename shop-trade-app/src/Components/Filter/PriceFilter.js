import classes from "./PriceFilter.module.css";
import { sorting } from "../../Store/product-slice";
import { useDispatch, useSelector } from "react-redux";

const PriceFilter = () => {
    const filteredProductList = useSelector(state => state.filteredProductList);
    const dispatch = useDispatch();

    const categoryChangeHandler = (event) => {
        console.log(event.target.value);
        dispatch(sorting(event.target.value, filteredProductList))
        ;
    }

    return (
        <>
            <button className={classes.button}>Sort By:
                <select name="" id="" className={classes.select_option} onChange={categoryChangeHandler}>
                    <option value="low-to-high">Price Low To High</option>
                    <option value="high-to-low">Price High To Low</option>
                </select>
            </button>
        </>
    )
}


export default PriceFilter;