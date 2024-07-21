import { Home, Phone, Package, MapPin, Star, Plus, Sliders,Award,UserCheck } from "react-feather";

export default [
  {
    id: "home",
    title: "User Detail",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "packages",
    title: "Packages",
    icon: <Package size={20} />,
    navLink: "/packages",
  },
  {
    id: "destination",
    title: "Destination",
    icon: <MapPin size={20} />,
    navLink: "/destination",
  }
  ,
  {
    id: "contact",
    title: "Contact",
    icon: <Phone size={20} />,
    navLink: "/contact",
  },
  {
    id: "booking",
    title: "Booking",
    icon: <Star size={20} />,
    navLink: "/booking",
  },
  {
    id: "slider",
    title: "slider",
    icon: <Sliders size={20} />,
    navLink: "/slider",
  },
  {
    id: "guide",
    title: "guide",
    icon: <Award size={20} />,
    navLink: "/guide",
  },
  {
    id: "subscribe",
    title: "subscribe",
    icon: <UserCheck size={20} />,
    navLink: "/subscribe",
  },
];
