import { Fragment } from "react";
import Advertisment from "../Advertisment/Advertisment";
import MainHeaders from "./MainHeaders";

const Layout = (props) => {
    return (
        <Fragment>
            <MainHeaders />
            <Advertisment />
            <main>{props.children}</main>
        </Fragment>
    )
}

export default Layout;