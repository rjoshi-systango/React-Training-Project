import CartItem from './CartItem';
import classes from './index.module.css';
// const DUMMY_DATA = [1,2,3,4,5];

const Cart = (props) => {
    const { productList } = props;
    const cartItems = (
        <ul className={classes['cart-items']}>
            {productList.map((product) => (
                <CartItem key={`${product.id} ${product.sizeId}`} productList={productList}/>
            ))}
        </ul>
    );

    return (
        <div className={classes.modal}>
            <div className={classes.content}>
                <div>
                    {cartItems}
                    <div className={classes.total}>
                        <span>Total Amount</span>
                        <span>{"totalAmount"}</span>
                    </div>
                    <div className={classes.actions}>
                        <button className={classes['button--alt']} >
                            Close
                        </button>
                        { <button className={classes.button}>Order</button>}
                    </div>
                </div></div>
        </div>

    )
}

export default Cart;