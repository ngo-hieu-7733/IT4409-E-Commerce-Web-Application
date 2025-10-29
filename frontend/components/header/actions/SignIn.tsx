import { SignInButton } from "@clerk/nextjs";
import Link from "next/link";

const SignIn = () => {
  return (
    // Use clerk for auth
    <SignInButton mode="modal">
      <button className="text-sm font-semibold hover:text-shop_dark_green hoverEffect hover:cursor-pointer">
        Login
      </button>
    </SignInButton>

    // Use normal auth
    // <Link href={"/login"}>
    //   <button className="text-sm font-semibold hover:text-shop_dark_green hoverEffect hover:cursor-pointer">
    //     Login
    //   </button>
    // </Link >
  )
};

export default SignIn;
