import Layout from "../Components/Layout/index";
import Product from '../Components/Product/index';
import FilterArea from '../Components/Filter/index';

const HomePage = () => {
    return (
        <>
          <Layout>
            <FilterArea />
            <Product />
          </Layout>
        </>
    );
}

export default HomePage;