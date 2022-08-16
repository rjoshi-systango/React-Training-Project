import ProductList from './ProductList';


const Product = () => {
  // const filteredProductList = useSelector(state => state.filteredProductList);
    return (
    <>        
        <div class=" container-fluid d-flex flex-wrap">
          <ProductList />
        </div>
    </>
    )
}

export default Product;