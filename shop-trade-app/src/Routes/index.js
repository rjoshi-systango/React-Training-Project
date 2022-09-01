import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import CartPage from "../Pages/CartPage";
import FavouritePage from "../Pages/FavouritePage";
import HomePage from "../Pages/HomePage";

const Routes = () => {
    const isLogin = useSelector(state => state.isLogin);

    return (
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
    )
}

export default Routes;