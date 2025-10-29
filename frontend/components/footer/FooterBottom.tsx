import React from "react";
import Logo from "../header/side-menu/Logo";

const FooterBottom = () => {
  return (
    <div className="py-6 border-t text-center text-sm text-gray-600">
      <div>
        © {new Date().getFullYear()} <Logo className="text-sm" />. All
        rights reserved.
      </div>
    </div>
  )
};

export default FooterBottom;
