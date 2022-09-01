import { useSelector } from 'react-redux';
import Favourite from "../Components/Favourite";

const FavouritePage = () => {
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
        })
    })
    return (
        <div>
            <Favourite productList={favouriteProductList} />
        </div>
    );
}

export default FavouritePage;