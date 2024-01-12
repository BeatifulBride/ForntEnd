import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import LayoutCSS from "./Layout.module.css"

function Layout() {

    return (
        <>
            <div className={LayoutCSS.background}>
            <Header/>
            <Navbar/>
            <Outlet/>
            </div>
            <Footer/>
        </>
    );
}

export default Layout;