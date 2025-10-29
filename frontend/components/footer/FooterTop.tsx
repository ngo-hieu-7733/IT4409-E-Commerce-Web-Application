import { Clock, Mail, MapPin, Phone } from "lucide-react";
import React from "react";

interface ContactItemData {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const data: ContactItemData[] = [
  {
    title: "Visit Us",
    subtitle: "New Orlean, USA",
    icon: (
      <MapPin className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
    ),
  },
  {
    title: "Call Us",
    subtitle: "+12 958 648 597",
    icon: (
      <Phone className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
    ),
  },
  {
    title: "Working Hours",
    subtitle: "Mon - Sat: 10:00 AM - 7:00 PM",
    icon: (
      <Clock className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
    ),
  },
  {
    title: "Email Us",
    subtitle: "Shopcart@gmail.com",
    icon: (
      <Mail className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
    ),
  },
];

const FooterTop = () => {
  return (
    <div className="border-b grid grid-cols-2 lg:grid-cols-4 gap-8">

      {data?.map((item, index) => (

        <div key={index} className="flex items-center gap-3 p-4 hover:bg-gray-100 group hoverEffect ">
          {item?.icon}
          <div>
            <h3 className="font-bold text-gray-900 group-hover:text-black hoverEffect">{item?.title}</h3>
            <p className="text-gray-600 text-sm tracking-wide group-hover:text-gray-900 hoverEffect">{item?.subtitle}</p>
          </div>
        </div>

      ))}

    </div>
  )
};

const ContactItem = () => {
  return (
    <div>
      <p>123</p>
    </div>
  )
}

export default FooterTop;
