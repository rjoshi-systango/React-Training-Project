import CartItem from './CartItem';
import classes from './index.module.css';
const DUMMY_DATA = [1,2,3,4,5];

const Cart = () => {

    const cartItems = (
        <ul className={classes['cart-items']}>
            {DUMMY_DATA.map((item) => (
                <CartItem key={Math.random()}/>
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