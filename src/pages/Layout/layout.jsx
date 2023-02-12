import React from "react";
import { Outlet } from "react-router-dom";
import css from "./layout.module.css";
import Footer from "../Footer/footer";
//import HomePage from "../HomePage/homePage";

const Layout = () => {
  return (
    <>
      <div className={css.wrapper}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
export default Layout;
