import { cn } from "@/lib/utils";
import Container from "./Container";
import React from "react";
import Logo from "./Logo";

const Header = () => {
  return <header className="bg-white py-5">
    <Container>
      <Logo/>
      {/* NavButton */}
      {/* NavAdmin */}
    </Container>
  </header>;
};

export default Header;
