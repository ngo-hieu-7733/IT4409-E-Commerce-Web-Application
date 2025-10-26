import { Facebook, Github, Instagram, Linkedin, Youtube } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  iconClassName?: string;
  tooltipClassName?: string;
}

const socialLink = [
  {
    title: 'Youtube',
    href: 'https://github.com/ngo-hieu-7733/IT4409-E-Commerce-Web-Application',
    icon: <Youtube className="w-5 h-5"/>
  },
  {
    title: 'Github',
    href: 'https://github.com/ngo-hieu-7733/IT4409-E-Commerce-Web-Application',
    icon: <Github className="w-5 h-5"/>
  },
  {
    title: 'Linkedin',
    href: 'https://github.com/ngo-hieu-7733/IT4409-E-Commerce-Web-Application',
    icon: <Linkedin className="w-5 h-5"/>
  },
  {
    title: 'Facebook',
    href: 'https://github.com/ngo-hieu-7733/IT4409-E-Commerce-Web-Application',
    icon: <Facebook className="w-5 h-5"/>
  },
  {
    title: 'Instagram',
    href: 'https://github.com/ngo-hieu-7733/IT4409-E-Commerce-Web-Application',
    icon: <Instagram className="w-5 h-5"/>
  },
]


const SocialMedia = ({className, iconClassName, tooltipClassName}:Props) => {
  return <TooltipProvider>
    <div className={cn("flex gap-3.5 items-center", className)}>

      {socialLink?.map(item => (
        <Tooltip key={item?.title}>

          <TooltipTrigger asChild>
            <Link
              key={item?.title}
              href={item?.href}
              className={cn("p-2 border rounded-full hover:text-white hover:border-shop_light_green hoverEffect", iconClassName)}
            >
              {item.icon}
            </Link>
          </TooltipTrigger>

          <TooltipContent className={cn('bg-white text-darkColor font-semibold', tooltipClassName)}>
            {item?.title}
          </TooltipContent>
        </Tooltip>
      ))}

    </div>
  </TooltipProvider>;
};

export default SocialMedia;
