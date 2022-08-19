import Product from "../Components/Product";
import { useSelector } from 'react-redux';

const Favourite = () => {
    const filteredProductList = useSelector(state => state.filteredProductList);
    const favouriteProductId = useSelector(state => state.favouriteProductList);

    const favouriteProductList = [];
    favouriteProductId.forEach((favId) => {
        favId = parseInt(favId);
        filteredProductList.forEach((productInformation) => {
            const productId = parseInt(productInformation.id);

            if (productId === favId) {
                favouriteProductList.push(productInformation);
            }
        } )
    })
    
    return (
        <div>
            <Product filteredProductList={favouriteProductList}  />   
        </div>
    );
}   

export default Favourite;