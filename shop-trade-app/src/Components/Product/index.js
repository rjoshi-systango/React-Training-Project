// import ProductList from './ProductList';
import ProductCard from './ProductCard';
import { useSelector } from 'react-redux';

const Product = () => {
  const filteredProductList = useSelector(state => state.filteredProductList);
  const favouriteProductId = useSelector(state => state.favouriteProductList);

    return (
      <div className=" container-fluid d-flex flex-wrap">
        { filteredProductList.map((product) => (
          <ProductCard key={product.id} productInformation={product} favouriteProductId={favouriteProductId} />
        )) }
      </div>
    )
}

export default Product;