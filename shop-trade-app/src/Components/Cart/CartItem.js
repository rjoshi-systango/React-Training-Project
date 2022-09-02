import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { deleteCartProduct, updateProductQuanity } from "../../Store/product-slice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import classes from './CartItem.module.css';
import ReactDOM from 'react-dom';
import Modal from "../Modal";


const CartItem = (props) => {
  const { productInformation, isSelectAllClicked, selectCounter } = props;
  let isQuantityOne = productInformation.quantity === 1;
  const [isCheckboxClicked, setIsCheckboxClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if(isSelectAllClicked) {
      setIsCheckboxClicked(isSelectAllClicked);
    }
    else if(!isSelectAllClicked && selectCounter%2 === 0 ) {
      setIsCheckboxClicked(false);
    }
  }, [isSelectAllClicked, selectCounter])

  const minusClickHandler = (event) => {
    if (productInformation.quantity > 1) {
      dispatch(updateProductQuanity(productInformation.firebaseId, (productInformation.quantity - 1)));
      const totalPrice = productInformation.price;

      if (isCheckboxClicked) {
        props.calculateTotalPrice("SUB", totalPrice);
      }
    }
  }

  const plusClickHandler = () => {
    dispatch(updateProductQuanity(productInformation.firebaseId, (productInformation.quantity + 1)));
    const totalPrice = productInformation.price;
    if (isCheckboxClicked) {
      props.calculateTotalPrice("ADD", totalPrice);
    }
  }

  const checkboxChangeHandler = (event) => {
    const checked = event.target.checked;
    const totalPrice = productInformation.price * productInformation.quantity;
    
    setIsCheckboxClicked((state) => !state);
    if(isSelectAllClicked) {
      props.onProductDeselect();
    }

    props.calculateTotalPrice(checked, totalPrice);
  }

  const deleteIconClickHandler = (information) => {
    setIsModalOpen(true);
  }

  const confirmClickHandler = () => {
    dispatch(deleteCartProduct(productInformation.firebaseId));
    const totalPrice = productInformation.price * productInformation.quantity;
    if (isCheckboxClicked) {
      props.calculateTotalPrice("SUB", totalPrice);
    }
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
          <td className="align-middle">
            <div >
              <FontAwesomeIcon className={classes.deleteCrossIcon} onClick={deleteIconClickHandler} icon={faXmark} />

            </div>
          </td>
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
            <input type="checkbox" className="mb-0" checked={isCheckboxClicked} style={{ fontWeight: "500" }} onChange={checkboxChangeHandler} />
          </td>
          <td className="align-middle">
            <p className="mb-0" style={{ fontWeight: "500" }}>{productInformation.vendor}</p>
          </td>
      
          <td className="align-middle">
            <div className="d-flex flex-row">
              {isQuantityOne &&
                <button className="btn btn-link px-2"
                  onClick={deleteIconClickHandler} >
                  <FontAwesomeIcon className={classes.icon} icon={faTrash} />
                </button>
              }
              {!isQuantityOne &&
                <button className="btn btn-link px-2"
                  onClick={minusClickHandler} >
                  <FontAwesomeIcon className={classes.icon} icon={faMinus} />
                </button>
              }

              <p className="form-control form-control-sm " style={{ width: "50px" }}>{productInformation.quantity}</p>

              <button className="btn btn-link px-2  "
                onClick={plusClickHandler} >
                <FontAwesomeIcon className={classes.icon} icon={faPlus} />
              </button>
            </div>
          </td>
          
          <td className="align-middle">
            <p className="mb-0" style={{ fontWeight: "500" }}>${productInformation.price} </p>
          </td>
        </tr>

      </tbody>
    </>
  )
}

export default CartItem;

