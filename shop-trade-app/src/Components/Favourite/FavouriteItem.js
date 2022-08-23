import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import FavouriteButton from "../FavouriteButton";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { changeFavouriteState } from "../../Store/product-slice";
import { useDispatch } from "react-redux";

const FavouriteItem = (props) => {
    const { productInformation } = props;
    const dispatch = useDispatch();

    const deleteClickHandler = () => {

        dispatch(changeFavouriteState(productInformation.id, 'DELETE'));
    }
    return  (
        <tbody>
      <tr>
        <th scope="row">
          <div className="d-flex align-items-center">
            <img src={productInformation.image_src[0]} className="img-fluid rounded-3"
              style={{ width: "120px" }} alt="Book" />
            <div className="flex-column ms-4">
              <p className="mb-2">{productInformation.name}</p>
              <p className="mb-0">{productInformation.sizeId}</p>
            </div>
          </div>
        </th>
        <td className="align-middle">
          <input type="checkbox" className="mb-0" style={{ fontWeight: "500" }} />
        </td>
        <td className="align-middle">
          <p className="mb-0" style={{ fontWeight: "500" }}>{productInformation.vendor}</p>
        </td>
        <td className="align-middle">
          <div className="d-flex flex-row">
        {/* favourite button */}
        <button className="btn btn-link px-2" onClick={deleteClickHandler}>
               <FontAwesomeIcon  icon={faTrash}/>
              </button>
            
          </div>
        </td>
        <td className="align-middle">
          <p className="mb-0" style={{ fontWeight: "500" }}>{productInformation.price}</p>
        </td>
      </tr>

    </tbody>
    )
}

export default FavouriteItem;