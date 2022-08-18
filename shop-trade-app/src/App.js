import './App.css';
import FilterArea from './Components/Filter/Filter';
import Layout from './Components/Layout/Layout';
import Product from './Components/Product/Product';
import { fetchCartData } from './Store/product-slice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from 'react-router-dom';



const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {

    dispatch(fetchCartData());
  }, [dispatch]);

  // const list = useSelector(state => state.productList);
  // console.log(list);
  return (
    <div >
      <Layout>
          <FilterArea />
          <Product />
      </Layout>
    </div>
  );
}

export default App;
