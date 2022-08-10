import classes from "./MainHeaders.module.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import logo from "../../Assests/img/logo.jpeg";
const MainHeaders = () => {
    return (
        <header className={`${classes.header} ` }>
            <div>
                <img src={"logo"} alt="logo"/>
            </div>
            <div className={classes.header_center}>
                <p className={classes.header_center_content}>Shop</p>
                <p className={classes.header_center_content}>About us</p>
                <p className={classes.header_center_content}>Our Stories</p>
                <p className={classes.header_center_content}> Contact Us</p>
            </div>
            <div className={classes.header_right}>
                <input type="text" className={classes.header_left_content} placeholder="search" />
                <p className={classes.header_left_content}>Profile</p>
                <p className={classes.header_left_content}>Cart</p>
            </div>
        </header>
    )
}

export default MainHeaders;