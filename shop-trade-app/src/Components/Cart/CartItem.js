import classes from './CartItem.module.css'

const CartItem = (props) => {
  const { productList } = props;
  console.log(productList);
  return (
    <li className={classes['cart-item']}>
      {productList.map((product) => (
        <>
          <div>
            <h2>{product.name}</h2>
            <div className={classes.summary}>
              <span className={classes.price}>{product.price}</span>
              <span className={classes.amount}>x {product.quantity}</span>
            </div>
          </div>
          <div className={classes.actions}>
            <button >−</button>
            <button >+</button>
          </div>
        </>
      ))}

    </li>
  )
}

export default CartItem;