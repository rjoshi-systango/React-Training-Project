import './App.css';
import { fetchCartData, fetchFavouriteData } from './Store/product-slice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Header from "./Components/Header/index";
import CartPage from './Pages/CartPage';
import Favourite from './Pages/Favourite';
import Advertisment from "./Components/Advertisment";




const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {

    dispatch(fetchCartData());
    dispatch(fetchFavouriteData());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <Advertisment />

      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/cart">
          <CartPage />
        </Route>
        <Route path="/favourite">
          <Favourite />
        </Route>

        <Route path="*">
          <p><span style={{ color: "red" }}>404</span> : No page found</p>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
