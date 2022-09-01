import { useState } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { changeFavouriteState } from "../../Store/product-slice";
import { useDispatch } from "react-redux";
import Modal from '../Modal';


const FavouriteItem = (props) => {
  const { productInformation, calculateTotalPrice } = props;
  let { price } = productInformation;
  const dispatch = useDispatch();
  const [isCheckboxClicked, setIsCheckboxClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const checkBoxChangeHandler = (event) => {
    setIsCheckboxClicked(state => !state)
    const checked = event.target.checked;
    price = parseInt(price);
    calculateTotalPrice(checked, price);
  }

  const deleteIconClickHandler = (information) => {
    setIsModalOpen(true);
  }

  const confirmClickHandler = () => {
    if (isCheckboxClicked) {
      price = parseInt(price);
      calculateTotalPrice("SUB", price);
    }
    dispatch(changeFavouriteState(productInformation.id, 'DELETE'));
    setIsModalOpen(false);
  }

  const cancelClickHandler = () => {
    setIsModalOpen(false);
  }

  const portalElement = document.getElementById('overlays');

  return (
    <>
      {isModalOpen && ReactDOM.createPortal(<Modal onConfirm={confirmClickHandler} onCancel={cancelClickHandler} />, portalElement)}

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
            <input type="checkbox" className="mb-0" style={{ fontWeight: "500" }} onChange={checkBoxChangeHandler} />
          </td>
          <td className="align-middle">
            <p className="mb-0" style={{ fontWeight: "500" }}>{productInformation.vendor}</p>
          </td>
          <td className="align-middle">
            <div className="d-flex flex-row">
              {/* favourite button */}
              <button className="btn btn-link px-2" onClick={deleteIconClickHandler}>
                <FontAwesomeIcon icon={faTrash} />
              </button>

            </div>
          </td>
          <td className="align-middle">
            <p className="mb-0" style={{ fontWeight: "500" }}>{productInformation.price}</p>
          </td>
        </tr>

      </tbody>
    </>
  )
}

export default FavouriteItem;