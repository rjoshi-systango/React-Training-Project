import './App.css';
import { fetchCartData, fetchFavouriteData, fetchCartProductList, productDataActions } from './Store/product-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Redirect, Route, Switch } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Header from "./Components/Header/index";
import CartPage from './Pages/CartPage';
import Advertisment from "./Components/Advertisment";
import FavouritePage from './Pages/FavouritePage';




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

      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/cart">
          {isLogin ?
            <CartPage /> : <Redirect to="/" />
          }
        </Route>
        <Route path="/favourite">
          {isLogin ?
            <FavouritePage /> : <Redirect to="/" />
          }

        </Route>

        <Route path="*">
          <p><span style={{ color: "red" }}>404</span> : No page found</p>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
