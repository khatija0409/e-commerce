import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.jpg";
import { MdSearch } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";

const Header = () => {
  return (
    <ReactNavbar
      burgerColorHover="#0a5aa9"
      logo={logo}
      logoWidth="20vmax"
      navColor1="white"
      logoHoverSize="10px"
      logoHoverColor="#0a5aa9"
      link1Text="Home"
      link2Text="Products"
      link3Text="Contact"
      link4Text="About"
      link1Url="/"
      // url when product is clicked in navbar
      link2Url="/products"
      link3Url="/contact"
      link4Url="/about"
      link1Size="1.3vmax"
      link1Color="rgba(35, 35, 35,0.8)"
      nav1justifyContent="flex-end"
      nav2justifyContent="flex-end"
      nav3justifyContent="flex-start"
      nav4justifyContent="flex-start"
      link1ColorHover="#0a5aa9"
      link1Margin="1vmax"
      profileIconColor="rgba(35, 35, 35,0.8)"
      searchIconColor="rgba(35, 35, 35,0.8)"
      cartIconColor="rgba(35, 35, 35,0.8)"
      profileIconColorHover="#0a5aa9"
      searchIconColorHover="#0a5aa9"
      cartIconColorHover="#0a5aa9"
      cartIconMargin="1vmax"
      searchIcon={true}
      SearchIconElement={MdSearch}
      cartIcon={true}
      CartIconElement={MdAddShoppingCart}
      profileIcon={true}
      ProfileIconElement={MdAccountCircle}
    />
  );
};

export default Header;