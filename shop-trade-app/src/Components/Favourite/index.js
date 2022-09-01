import FavouriteItem from "./FavouriteItem";
import { useReducer, useState } from "react";
import Message from "../Message";
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';

const priceReducer = (state, action) => {
    if (action.type === true) {
        return {
            subTotal: state.subTotal + action.productTotalPrice,
            tax: state.tax + (action.productTotalPrice * 5) / 100,
            total: state.total + (action.productTotalPrice + (action.productTotalPrice * 5) / 100)
        }
    }
    if (action.type === false) {
        return {
            subTotal: state.subTotal - action.productTotalPrice,
            tax: state.tax - (action.productTotalPrice * 5) / 100,
            total: state.total - (action.productTotalPrice + (action.productTotalPrice * 5) / 100)
        }
    }
    if (action.type === "ADD") {
        const productPrice = parseInt(action.productTotalPrice);
        console.log(typeof (productPrice));

        return {
            subTotal: state.subTotal + productPrice,
            tax: state.tax + (productPrice * 5) / 100,
            total: state.total + (productPrice + (productPrice * 5) / 100)
        }
    }
    if (action.type === "SUB") {
        const productPrice = parseInt(action.productTotalPrice);
        console.log(typeof (productPrice));
        return {
            subTotal: state.subTotal - productPrice,
            tax: state.tax - (productPrice * 5) / 100,
            total: state.total - (productPrice + (productPrice * 5) / 100)
        }
    }
}

const Favourite = (props) => {
    const { productList } = props;
    const [totalPrice, dispatch] = useReducer(priceReducer, { total: 0, tax: 0, subTotal: 0 });
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    const history = useHistory();

    const calculateTotalPrice = (checkbox, productTotalPrice) => {
        dispatch({ type: checkbox, productTotalPrice });
    }

    const buyClickHandler = () => {
        setIsOrderPlaced(true);
        setTimeout(() => {
            setIsOrderPlaced(false);
            history.replace('/');
        }, 2000)
    }

    const closeMessageBoxHandler = () => {
        setIsOrderPlaced(false);
    }

    const portalElement = document.getElementById('overlays');


    return (
        <>
            <section className="h-100 h-custom">
                <div className="container h-100 py-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        {isOrderPlaced && ReactDOM.createPortal(<Message onClose={closeMessageBoxHandler} />, portalElement)}
                        <div className="col">
                            {productList.length === 0 &&
                                <h5>No Favourite</h5>
                            }
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="h5">Your Favourite</th>
                                            <th scope="col">Select  </th>
                                            <th scope="col">Brand</th>
                                            <th scope="col">Favourite</th>
                                            <th scope="col">Price ($)</th>
                                        </tr>
                                    </thead>
                                    {
                                        productList.map((product) => (

                                            <FavouriteItem key={`${product.id} ${product.sizeId}`}
                                                productInformation={product} calculateTotalPrice={calculateTotalPrice}

                                            />
                                        ))
                                    }

                                </table>
                            </div>

                            <div className="card shadow-2-strong mb-5 mb-lg-0" style={{ borderRadius: "16px" }} >
                                <div className="card-body p-4">
                                    <div className="row">
                                        <div className="col-lg-4 col-xl-3">
                                            <div className="d-flex justify-content-between" style={{ fontWeight: "500" }}>
                                                <p className="mb-2">Subtotal</p>
                                                <p className="mb-2">${totalPrice.subTotal}</p>
                                            </div>
                                            <hr className="my-4" />
                                            <div className="d-flex justify-content-between mb-4" style={{ fontWeight: "500" }}>
                                                <p className="mb-2">Total (tax included)</p>
                                                <p className="mb-2">${totalPrice.tax}</p>
                                            </div>

                                            <button type="button" onClick={buyClickHandler} className="btn btn-primary btn-block btn-lg">
                                                <div className="d-flex justify-content-between">
                                                    <span>Checkout</span>
                                                    <span className="px-2"> ${totalPrice.total}</span>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Favourite;