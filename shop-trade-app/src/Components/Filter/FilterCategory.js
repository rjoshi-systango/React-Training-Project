import { useSelector } from "react-redux"
import classes from './FilterCategory.module.css';
import { useDispatch } from "react-redux";
import { productDataActions } from '../../Store/product-slice';

// const categoryContainer = ["Denim", "Jeans", "Tee-Shirt", "Jackets"]
const uniqueCategory = {"All-Products": true};  

const FilterCategory = () => {

    const productList = useSelector(state => state.productList);
    const dispatch = useDispatch();
    // console.log(productList.length);

    for(let index = 0 ; index < productList.length ; index++) {
        let category = productList[index].tag;
        // console.log(category);
        if (!uniqueCategory[category]) {
            uniqueCategory[category] = true;
        }
    }
    const categoryContainer = Object.keys(uniqueCategory);
  
    // console.log(categoryContainer);

    const filterClickHandler = (event) => {
        let selectedCategory = event.target.value;
        // console.log(selectedCategory);
        dispatch(
            productDataActions.filterProduct({category: selectedCategory})
            );
    }

    return (
        <>
            {categoryContainer.map((item) => {
                return <div>
                    <button className={classes.categoryBtn} value={item} onClick={filterClickHandler} >{item}</button>
                </div>
            })}
        </>
    )
}

export default FilterCategory;
