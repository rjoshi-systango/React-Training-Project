import { useDispatch, useSelector } from 'react-redux';
import { changeFavouriteState, productDataActions } from '../../Store/product-slice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartEmpty } from '@fortawesome/free-regular-svg-icons';
import classes from './index.module.css';

const FavouriteButton = (props) => {
    const favouriteProductId = useSelector((state) => state.favouriteProductList);
    const isLogin = useSelector(state => state.isLogin);
    const isFavourite = favouriteProductId.filter((id) => {
        id = parseInt(id);
        return id === props.id;
    });

    const dispatch = useDispatch();

    const favouriteClickHandler = () => {
        if(isLogin) {
            if(isFavourite.length > 0) {
                dispatch(changeFavouriteState(props.id, 'DELETE'));
            }
            else {
                dispatch(changeFavouriteState(props.id, 'POST'));
            }
        }
        else {
            dispatch(productDataActions.setIsLoginPage());
        }
    }

    return (
        <div onClick={favouriteClickHandler} className={`${classes.favourite_btn}`} >
           <FontAwesomeIcon className={`card-img-overlay`} icon={isFavourite.length > 0 ? faHeart : faHeartEmpty} />
        </div>
    )
}

export default FavouriteButton;