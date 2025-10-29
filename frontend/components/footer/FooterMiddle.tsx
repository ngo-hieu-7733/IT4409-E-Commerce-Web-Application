import React from "react";
import Logo from "../header/side-menu/Logo";
import SocialMedia from "../header/side-menu/SocialMedia";

const FooterMiddle = () => {
  return (
    <div className="border-b py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div className="space-y-4">
        <Logo />
        <p>
          Discover curated furniture collections at Shopcart, blending style and comfort to elevate your living spaces.
        </p>
        <SocialMedia
          className="text-darkColor/60"
          iconClassName="border-darkColor/60 hover:border-shop_dark_green hover:text-shop_dark_green"
          tooltipClassName="bg-darkColor text-white"
        />
      </div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
};

export default FooterMiddle;
