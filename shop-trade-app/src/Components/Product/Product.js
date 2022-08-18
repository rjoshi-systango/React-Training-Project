import ProductList from './ProductList';


const Product = () => {
  // const filteredProductList = useSelector(state => state.filteredProductList);
    return (
    <>        
        <div className=" container-fluid d-flex flex-wrap">
          <ProductList />
        </div>
    </>
    )
}

export default Product;