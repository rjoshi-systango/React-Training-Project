import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteCartProduct, updateProductQuanity } from "../../Store/product-slice";
import { useDispatch } from "react-redux";
import { useState } from 'react';

const CartItem = (props) => {
  const { productInformation } = props;
  let isQuantityOne = productInformation.quantity === 1;
  const [isCheckboxClicked, setIsCheckboxClicked] = useState(false);
  const dispatch = useDispatch();
  // console.log(productInformation);

  
  
  
  const minusClickHandler = (event) => {
    if(productInformation.quantity > 1) {
      dispatch(updateProductQuanity(productInformation.firebaseId, (productInformation.quantity - 1)));
      const totalPrice = productInformation.price ;
      console.log(totalPrice);
      if(isCheckboxClicked) {
        console.log("yes plus if checked");
        props.calculateTotalPrice("SUB", totalPrice);
      }
    }
  }
  
  const deleteClickHandler = () => {
    dispatch(deleteCartProduct(productInformation.firebaseId));
    const totalPrice = productInformation.price * productInformation.quantity;
    if(isCheckboxClicked) {
      props.calculateTotalPrice("SUB", totalPrice);
    }
    
  }
  
  const plusClickHandler = () => {
    dispatch(updateProductQuanity(productInformation.firebaseId, (productInformation.quantity + 1)));
    const totalPrice = productInformation.price ;
      if(isCheckboxClicked) {
        props.calculateTotalPrice("ADD", totalPrice);
      }

    
  }
  
  const checkboxChangeHandler = (event) => {
    setIsCheckboxClicked((state) => !state);
    const checked = event.target.checked;
    const totalPrice = productInformation.price * productInformation.quantity;
    props.calculateTotalPrice(checked, totalPrice);
  }

  return (
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
          <input type="checkbox" className="mb-0" style={{ fontWeight: "500" }} onChange={checkboxChangeHandler}/>
        </td>
        <td className="align-middle">
          <p className="mb-0" style={{ fontWeight: "500" }}>{productInformation.vendor}</p>
        </td>
        <td className="align-middle">
          <div className="d-flex flex-row">
            {isQuantityOne && 
              <button className="btn btn-link px-2"
                onClick={deleteClickHandler} >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            }
             {!isQuantityOne && 
              <button className="btn btn-link px-2"
                onClick={minusClickHandler} >
                <FontAwesomeIcon icon={faMinus} />
              </button>
            }
           
            <p className="form-control form-control-sm " style={{ width: "50px" }}>{productInformation.quantity}</p>

            <button className="btn btn-link px-2 "
              onClick={plusClickHandler} >
              <FontAwesomeIcon icon={faPlus} />
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

export default CartItem;

