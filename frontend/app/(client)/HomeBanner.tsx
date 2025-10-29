import { Title } from "@/components/ui/text";
import { banner_1 } from "@/images";
import Image from "next/image";
import Link from "next/link";

const HomeBanner = () => {
  return (
    <>
      <div className="py-16 md:py-0 bg-shop_light_pink rounded-lg px-10 lg:px-24 flex items-center justify-between">
        
        {/* Left: Title */}
        <div className="space-y-5">
          <Title>
            Grab Upto 50% Off On <br />
            Selected Headphone
          </Title>
          <Link href={"/shop"} className="bg-shop_btn_dark_green/90 text-white/90 px-5 py-2 rounded-md text-sm font-semibold hover:text-white hover:bg-shop_btn_dark_green hoverEffect">Buy Now</Link>
        </div>

        {/* Right: Image */}
        <div>
          <Image
            src={banner_1}
            alt="banner_1"
            className="hidden md:inline-flex w-96"
          ></Image>
        </div>

      </div>
    </>
  )
};

export default HomeBanner;
