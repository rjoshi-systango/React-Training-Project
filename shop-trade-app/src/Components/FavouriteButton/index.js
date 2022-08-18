import { useDispatch } from 'react-redux';
import { addFavourite } from '../../Store/product-slice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartEmpty } from '@fortawesome/free-regular-svg-icons';

import { useState } from 'react';

const FavouriteButton = (props) => {
    // console.log(props.id);
    const [isFavourite, setIsFavourite] = useState(false);
    const dispatch = useDispatch();

    const favouriteClickHandler = () => {
        dispatch(addFavourite(props.id));
        console.log(props.id);
        setIsFavourite((prevState) => !prevState);
    }

    return (
        <div onClick={favouriteClickHandler}>
           <FontAwesomeIcon icon={isFavourite ? faHeart : faHeartEmpty} />
        </div>
    )
}

export default FavouriteButton;