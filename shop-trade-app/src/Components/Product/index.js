import ProductCard from './ProductCard';

const Product = (props) => {
  const filteredProductList = props.filteredProductList;

    return (
      <div className="container-fluid row">
        { filteredProductList.map((product) => (
          <ProductCard key={product.id} productInformation={product}  />
        )) }
            
      </div>
    )
}

export default Product;