import { SignInButton } from "@clerk/nextjs";
import SignInButtonFoo from "./SignInButtonFoo";

const SignIn = () => {
  return (
    <SignInButton mode="modal">
      <button className="text-sm font-semibold hover:text-shop_dark_green hoverEffect hover:cursor-pointer">
        Login
      </button>
    </SignInButton>
  )
};

export default SignIn;
