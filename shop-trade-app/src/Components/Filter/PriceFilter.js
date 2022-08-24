import classes from "./PriceFilter.module.css";
import { useDispatch } from 'react-redux';
import { productDataActions } from "../../Store/product-slice";

const PriceFilter = () => {
    // const filteredProductList = useSelector(state => state.filteredProductList);
    const dispatch = useDispatch();
    
    // console.log(filteredProductList);
    const categoryChangeHandler = (event) => {
        // console.log(event.target.value);
        const sortBy = event.target.value;
        if(sortBy) {
            dispatch(productDataActions.filterProuductByPrice({
                sort: sortBy
            }));

        }
    }

    return (

        <div className={"classes.price_filter"}>
            <button className={classes.button}>Sort By : 
                <select name="" id="" className={classes.select_option} onChange={categoryChangeHandler}>
                    <option value="">Select </option>
                    <option value="low-to-high">Price Low To High</option>
                    <option value="high-to-low">Price High To Low</option>
                </select>
                
            </button>
        </div>


    )
}


export default PriceFilter;