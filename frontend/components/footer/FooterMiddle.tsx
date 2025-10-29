import { categoriesData, quickLinksData } from "@/constants/data";
import Logo from "../header/side-menu/Logo";
import SocialMedia from "../header/side-menu/SocialMedia";
import { SubText, SubTitle } from "../ui/text";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const FooterMiddle = () => {
  return (
    <div className="border-b py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <BasicInfo />
      <QuickLinks />
      <Categories />
      <Newsletter />
    </div>
  )
};

const BasicInfo = () => {
  return (
    <div className="space-y-4">
      <Logo />
      <SubText>
        Discover curated furniture collections at Shopcart, blending style and comfort to elevate your living spaces.
      </SubText>
      <SocialMedia
        className="text-darkColor/60"
        iconClassName="border-darkColor/60 hover:border-shop_dark_green hover:text-shop_dark_green"
        tooltipClassName="bg-darkColor text-white"
      />
    </div>
  )
}

const QuickLinks = () => {
  return (
    <div>
      <SubTitle>Quick Links</SubTitle>
      <ul className="space-y-3 mt-4">
        {quickLinksData?.map((item) => (
          <li key={item?.title}>
            <Link href={item?.href} >
              <SubText className="hover:text-shop_dark_green hoverEffect hover:font-medium">{item?.title}</SubText>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const Categories = () => {
  return (
    <div>
      <SubTitle>Categories</SubTitle>
      <ul className="space-y-3 mt-4">
        {categoriesData?.map((item) => (
          <li key={item?.title}>
            <Link href={`/category/${item?.href}`} >
              <SubText className="hover:text-shop_dark_green hoverEffect hover:font-medium">{item?.title}</SubText>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const Newsletter = () => {
  return (
    <div className="space-y-4">
      <SubTitle>Newsletter</SubTitle>
      <SubText>Subscribe to our newsletter to receive updates and exclusive offers.</SubText>
      <form className="space-y-3">
        <Input placeholder="Enter your email" type="email" required/>
        <Button className="w-full">Subscribe</Button>
      </form>
    </div>
  )
}
export default FooterMiddle;
