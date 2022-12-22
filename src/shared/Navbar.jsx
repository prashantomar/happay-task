import React from "react";
import appLogo from "../assets/blue_logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";
import { getList } from "../app/reducers/productsSlice";

function Navbar() {
  const navigate = useNavigate();
  const handleCartClick = () => navigate("/cart");
  const handleLogoClick = () => navigate("/");
  const products = useSelector(getList);
  const totalQ = products.reduce((a, b) => a + b.quantity, 0)  || 0
  return (
    <div className="navbar-container">
      <div className="flex-row align-center cursor-pointer"  onClick={() => handleLogoClick()}>
        <img src={appLogo} className="app-logo" alt="img"></img>
        <div className="app-title" >Happay</div>
      </div>
      <span className="flex-row align-center " onClick={() => handleCartClick()}>
        <div className="cart-wrapper cursor-pointer">
          <FontAwesomeIcon icon={faCartShopping} />
          <span className={`${totalQ > 0 ? 'cart-quantity' : 'cart-empty'}`}>{totalQ}</span>
        </div>


        <Avatar />
      </span>
    </div>
  );
}

export default Navbar;
