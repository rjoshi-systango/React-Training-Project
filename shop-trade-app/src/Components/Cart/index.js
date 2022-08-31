import { useReducer } from "react";
import CartItem from "./CartItem";

const priceReducer = (state, action) => {
    if (action.type === true) {
        return {
            subTotal: state.subTotal + action.productTotalPrice,
            tax: state.tax + (action.productTotalPrice * 5) / 100,
            total: state.total + (action.productTotalPrice + (action.productTotalPrice * 5) / 100),
        }
    }
    if (action.type === false) {
        return {
            subTotal: state.subTotal - action.productTotalPrice,
            tax: state.tax - (action.productTotalPrice * 5) / 100,
            total: state.total - (action.productTotalPrice + (action.productTotalPrice * 5) / 100),
        }
    }
    if (action.type === "ADD") {
        const productPrice = parseInt(action.productTotalPrice);

        return {
            subTotal: state.subTotal + productPrice,
            tax: state.tax + (productPrice * 5) / 100,
            total: state.total + (productPrice + (productPrice * 5) / 100),
        }
    }
    if (action.type === "SUB") {
        const productPrice = parseInt(action.productTotalPrice);
        console.log(typeof (productPrice));
        return {
            subTotal: state.subTotal - productPrice,
            tax: state.tax - (productPrice * 5) / 100,
            total: state.total - (productPrice + (productPrice * 5) / 100),
        }
    }
}
const Cart = (props) => {
    const { productList } = props;
    const [totalPrice, dispatch] = useReducer(priceReducer, { total: 0, tax: 0, subTotal: 0, isSelectAllClicked: false });

    const calculateTotalPrice = (checkbox, productTotalPrice) => {
        dispatch({ type: checkbox, productTotalPrice });
    }

    return (
        <>
            <section className="h-100 h-custom">
                <div className="container h-100 py-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col"> </th>
                                            <th scope="col" className="h5">Systango Shopping Bag</th>
                                            <th scope="col">Select</th>
                                            <th scope="col">Brand</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Price</th>
                                        </tr>
                                    </thead>
                                    { productList.map((product) => (
                                        <CartItem key={`${product.id} ${product.sizeId}`}
                                            productInformation={product}
                                            calculateTotalPrice={calculateTotalPrice}
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
                                            <button type="button" className="btn btn-primary btn-block btn-lg">
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