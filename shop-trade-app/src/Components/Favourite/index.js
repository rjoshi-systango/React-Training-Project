import FavouriteItem from "./FavouriteItem";

const Favourite = (props) => {
    const { productList } = props;
    return (
        <section className="h-100 h-custom">
            <div className="container h-100 py-5">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col">

                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col" className="h5">Systango Shopping Bag</th>
                                        <th scope="col">Select  </th>
                                        <th scope="col">Brand</th>
                                        <th scope="col">Favourite</th>
                                        <th scope="col">Price</th>
                                    </tr>
                                </thead>
                                {/* {tbody} */}
                                {
                                    productList.map((product) => (

                                        <FavouriteItem key={`${product.id} ${product.sizeId}`}
                                            productInformation={product}
                                            
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
                                            <p className="mb-2">${"totalPrice.subTotal"}</p>
                                        </div>



                                        <hr className="my-4" />

                                        <div className="d-flex justify-content-between mb-4" style={{ fontWeight: "500" }}>
                                            <p className="mb-2">Total (tax included)</p>
                                            <p className="mb-2">${"totalPrice.tax"}</p>
                                        </div>

                                        <button type="button" className="btn btn-primary btn-block btn-lg">
                                            <div className="d-flex justify-content-between">
                                                <span>Checkout</span>
                                                <span className="px-2"> ${"totalPrice.total"}</span>
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
    )
}

export default Favourite;