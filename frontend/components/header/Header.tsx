import { currentUser } from "@clerk/nextjs/server"
import { ClerkLoaded, SignedIn, UserButton } from "@clerk/nextjs";
import Container from "../Container";
import Logo from "./side-menu/Logo";
import HeaderMenu from "./HeaderMenu";
import SearchBar from "./actions/SearchBar";
import CartIcon from "./actions/CartIcon";
import FavoriteButton from "./actions/FavoriteButton";
import SignIn from "./actions/SignIn";
import MobileMenu from "./side-menu/MobileMenu";

const Header = async () => {

  const user = await currentUser()

  return (
    <header className="bg-white py-5">
      <Container className="flex items-center justify-between text-lightColor">
        <div className="w-auto md:w-1/3 flex items-center justify-start gap-2.5 md:gap-0">
          <MobileMenu/>
          <Logo />
        </div>
        <HeaderMenu/>
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          <SearchBar />
          <CartIcon />
          <FavoriteButton />
          <ClerkLoaded>
            <SignedIn>
              <UserButton/>
            </SignedIn>
            {!user && <SignIn />}
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  );
};

export default Header;
