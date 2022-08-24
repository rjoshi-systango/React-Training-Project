import classes from './CategoryFilter.module.css';

import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { productDataActions } from '../../Store/product-slice';

// const categoryContainer = ["Denim", "Jeans", "Tee-Shirt", "Jackets"]
const uniqueCategory = { "All-Products": true };

const CategoryFilter = () => {

    const productList = useSelector(state => state.productList);
    const dispatch = useDispatch();

    for (let index = 0; index < productList.length; index++) {
        let category = productList[index].tag;
        if (!uniqueCategory[category]) {
            uniqueCategory[category] = true;
        }
    }
    const categoryContainer = Object.keys(uniqueCategory);

    const filterClickHandler = (event) => {
        let selectedCategory = event.target.value;
        dispatch(
            productDataActions.filterProduct({ category: selectedCategory })
        );
    }

    return (
        <div className={`${classes.filter_option} flex-column flex-md-row `}>
            <div className="container-fluid d-flex ">
                <div className='d-flex flex-wrap'>
                <p className={` ${classes.filter_heading} m-0 align-self-center`}>FILTERS :</p>

                {categoryContainer.map((item) => (
                    <div key={item}>
                        <button className={`${classes.categoryBtn}`} value={item} onClick={filterClickHandler} >{item}</button>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}

export default CategoryFilter;
