import classes from "./PriceFilter.module.css";

const PriceFilter = () => {
    const categoryChangeHandler = (event) => {
        console.log(event.target.value);
    }

    return (

        <div className={"classes.price_filter"}>
            <button className={classes.button}>Sort By : 
                <select name="" id="" className={classes.select_option} onChange={categoryChangeHandler}>
                    <option value="low-to-high">Price Low To High</option>
                    <option value="high-to-low">Price High To Low</option>
                </select>
            </button>
        </div>


    )
}


export default PriceFilter;