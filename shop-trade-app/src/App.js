import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from 'react';
import { fetchCartData, fetchFavouriteData, fetchCartProductList, productDataActions } from './Store/product-slice';
import { useDispatch, useSelector } from 'react-redux';
import Header from "./Components/Header/index";
import Advertisment from "./Components/Advertisment";
import Routes from './Routes';

const App = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const isLogin = useSelector(state => state.isLogin);
  
  useEffect(() => {
    dispatch(productDataActions.setToken({ token }));
    if (isLogin) {
      dispatch(fetchFavouriteData());
      dispatch(fetchCartProductList());

    }
  }, [dispatch, token, isLogin]);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch])


  return (
    <div>
      <Header />
      <Advertisment />

      <Routes />
    </div>
  );
}

export default App;
