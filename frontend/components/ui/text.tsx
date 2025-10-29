import { cn } from "@/lib/utils"

const Title = ({
  children,
  className
}: {
  children: React.ReactNode,
  className?:string
}) => <h2 className={cn("text-3xl font-bold text-shop_dark_green capitalize tracking-wide font-sans", className)}>{children}</h2>

const SubTitle = ({
  children,
  className
}: {
  children: React.ReactNode,
  className?:string
}) => <h3 className={cn("font-semibold text-gray-900 capitalize  font-sans", className)}>{children}</h3>

const SubText = ({
  children,
  className
}: {
  children: React.ReactNode,
  className?:string
}) => <p className={cn("text-gray-600 text-sm tracking-wider capitalize", className)}>{children}</p>

export {Title, SubTitle, SubText}