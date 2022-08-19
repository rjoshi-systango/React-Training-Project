import Layout from "../Components/Layout/index";
import Product from '../Components/Product/index';
import FilterArea from '../Components/Filter/index';
import { useSelector } from 'react-redux';


const HomePage = () => {
  const filteredProductList = useSelector(state => state.filteredProductList);

  return (
        <>
          <Layout>
            <FilterArea />
            <Product filteredProductList={filteredProductList}/>
          </Layout>
        </>
    );
}

export default HomePage;