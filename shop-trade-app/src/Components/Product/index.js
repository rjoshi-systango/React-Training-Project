import ProductCard from './ProductCard';
import { useSelector } from 'react-redux';

const Product = () => {
  const filteredProductList = useSelector(state => state.filteredProductList);

    return (
      <div className=" container-fluid d-flex flex-wrap">
        { filteredProductList.map((product) => (
          <ProductCard key={product.id} productInformation={product}  />
        )) }
      </div>
    )
}

export default Product;