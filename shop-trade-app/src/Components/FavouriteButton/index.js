import { useDispatch, useSelector } from 'react-redux';
import { changeFavouriteState } from '../../Store/product-slice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartEmpty } from '@fortawesome/free-regular-svg-icons';


const FavouriteButton = (props) => {
    const favouriteProductId = useSelector((state) => state.favouriteProductList);

    const isFavourite = favouriteProductId.filter((id) => {
        id = parseInt(id);
        return id === props.id;
    });

    const dispatch = useDispatch();

    const favouriteClickHandler = () => {
        if(isFavourite.length > 0) {
            dispatch(changeFavouriteState(props.id, 'DELETE'));
        }
        else {
            dispatch(changeFavouriteState(props.id, 'POST'));
        }
    }

    return (
        <div onClick={favouriteClickHandler}>
           <FontAwesomeIcon icon={isFavourite.length > 0 ? faHeart : faHeartEmpty} />
        </div>
    )
}

export default FavouriteButton;