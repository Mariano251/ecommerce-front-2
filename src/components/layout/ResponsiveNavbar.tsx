import React from "react";
import "./navbar.scss";
import Navbar from "./Navbar";
import Hamburguer from "./Hamburguer";

const ResponsiveNavbar: React.FC = () => {
  return (
    <>
      <div className="navbar-desktop">
        <Navbar/>
      </div>

      <div className="navbar-mobile">
        <Hamburguer/>
      </div>
    </>
  );
};

export default ResponsiveNavbar;