"use client"
import { headerData } from "@/constants/data";
import { usePathname } from "next/navigation";
import Link from "next/link";

const HeaderMenu = () => {
  const pathName = usePathname()
  console.log(pathName)
  return (
    <div className="hidden md:inline-flex w-1/3 items-center justify-center gap-7 text-sm capitalize font-semibold">
      {headerData.map(item => (
        <Link
          key={item?.title}
          href={item?.href}
          className={
            `hover:text-shop_light_green hoverEffect relative group ${pathName === item?.href && 'text-shop_light_green'}`
          }
        >
          {item?.title}

          <span className={`absolute -bottom-0.5 left-1/2 bg-shop_light_green w-0 h-0.5 group-hover:w-1/2 hoverEffect group-hover:left-0  ${pathName === item?.href && 'w-1/2'}`}></span>

          <span className={`absolute -bottom-0.5 right-1/2 bg-shop_light_green w-0 h-0.5 group-hover:w-1/2 hoverEffect group-hover:right-0 ${pathName === item?.href && 'w-1/2'}`}></span>
        </Link>
      ))}
    </div>
  );
};

export default HeaderMenu;
