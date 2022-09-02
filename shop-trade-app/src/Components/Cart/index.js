import { useReducer, useState } from "react";
import ReactDOM from 'react-dom';
import CartItem from "./CartItem";
import { useHistory } from 'react-router-dom';
import Message from "../Message";


const priceReducer = (state, action) => {
    if (action.type === true) {
        return {
            subTotal: state.subTotal + action.productTotalPrice,
            tax: state.tax + (action.productTotalPrice * 5) / 100,
            total: state.total + (action.productTotalPrice + (action.productTotalPrice * 5) / 100),
            isSelectAllClicked: state.isSelectAllClicked,
            selectCount: state.selectCount
        }
    }
    if (action.type === false) {
        return {
            subTotal: state.subTotal - action.productTotalPrice,
            tax: state.tax - (action.productTotalPrice * 5) / 100,
            total: state.total - (action.productTotalPrice + (action.productTotalPrice * 5) / 100),
            isSelectAllClicked: state.isSelectAllClicked ? !state.isSelectAllClicked : state.isSelectAllClicked,
            selectCount: state.selectCount
        }
    }
    if (action.type === "ADD") {
        const productPrice = parseInt(action.productTotalPrice);
        return {
            subTotal: state.subTotal + productPrice,
            tax: state.tax + (productPrice * 5) / 100,
            total: state.total + (productPrice + (productPrice * 5) / 100),
            isSelectAllClicked: state.isSelectAllClicked,
            selectCount: state.selectCount
        }
    }
    if (action.type === "SUB") {
        const productPrice = parseInt(action.productTotalPrice);
        return {
            subTotal: state.subTotal - productPrice,
            tax: state.tax - (productPrice * 5) / 100,
            total: state.total - (productPrice + (productPrice * 5) / 100),
            isSelectAllClicked: state.isSelectAllClicked,
            selectCount: state.selectCount
        }
    }
    if (action.type === "SELECT_ALL") {
        const allProductTotal = action.totalPrice;
        return {
            subTotal: allProductTotal,
            tax: (allProductTotal * 5) / 100,
            total: allProductTotal + ((allProductTotal * 5) / 100),
            isSelectAllClicked : true,
            selectCount: state.selectCount + 1
        }
    }
    if (action.type === "DESELECT_ALL") {
        return {
            subTotal: 0,
            tax: 0,
            total: 0,
            isSelectAllClicked: false,
            selectCount: state.selectCount + 1
        }
    }
    if (action.type === "") {
        return {
            subTotal: state.subTotal,
            tax: state.tax,
            total: state.total,
            isSelectAllClicked: false,
            selectCount: state.selectCount
        }
    }
}

const Cart = (props) => {
    const { productList } = props;
    const [totalPrice, dispatch] = useReducer(priceReducer, { total: 0, tax: 0, subTotal: 0, isSelectAllClicked: false, selectCount: 0 });
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    const portalElement = document.getElementById('overlays');
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

    const selectAllChangleHandler = (event) => {
        const { checked }= event.target;
        let totalPrice = 0;
        
        if (checked) {
            productList.forEach((product) => {
                totalPrice += product.price * product.quantity
            });
            dispatch({type: "SELECT_ALL", totalPrice});
        }
        else {
            dispatch({type: "DESELECT_ALL"});
        }
    }

    const deSelectAll = (totalPrice) => {
        dispatch({type: "", productTotalPrice: totalPrice });
    }

    const closeMessageBoxHandler = () => {
        setIsOrderPlaced(false);
    }

    return (
        <>
            <section className="h-100 h-custom">
                <div className="container h-100 py-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                    {isOrderPlaced && ReactDOM.createPortal(<Message onClose={closeMessageBoxHandler}/>, portalElement)}
                        <div className="col">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col"> </th>
                                            <th scope="col" className="h5">Systango Shopping Bag</th>
                                            <th scope="col">
                                                <input type='checkbox' checked={totalPrice.isSelectAllClicked} className={`mb-0`} onChange={selectAllChangleHandler}/>  Select
                                            </th>
                                            <th scope="col">Brand</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Price</th>
                                        </tr>
                                    </thead>
                                    { productList.map((product) => (
                                        <CartItem key={`${product.id} ${product.sizeId}`}
                                            productInformation={product}
                                            calculateTotalPrice={calculateTotalPrice}
                                            isSelectAllClicked={totalPrice.isSelectAllClicked}
                                            onProductDeselect={deSelectAll} 
                                            selectCounter={totalPrice.selectCount}
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
                                                <p className="mb-2">${totalPrice.subTotal.toFixed(2)}</p>
                                            </div>
                                            <hr className="my-4" />
                                            <div className="d-flex justify-content-between mb-4" style={{ fontWeight: "500" }}>
                                                <p className="mb-2">Total (tax included)</p>
                                                <p className="mb-2">${totalPrice.tax.toFixed(2)}</p>
                                            </div>
                                            <button type="button" onClick={buyClickHandler} className="btn btn-primary btn-block btn-lg">
                                                <div className="d-flex justify-content-between">
                                                    <span>Checkout</span>
                                                    <span className="px-2"> ${totalPrice.total.toFixed(2)}</span>
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

export default Cart;