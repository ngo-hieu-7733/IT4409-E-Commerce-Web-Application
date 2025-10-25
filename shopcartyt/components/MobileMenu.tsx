import { AlignLeft } from "lucide-react";
import React from "react";

const MobileMenu = () => {
  return <>
    <button>
      <AlignLeft className="md:hidden  hover:text-darkColor hoverEffect hover:cursor-pointer"/>
    </button>
  </>;
};

export default MobileMenu;
