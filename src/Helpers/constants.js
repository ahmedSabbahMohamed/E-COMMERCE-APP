import { FaProductHunt } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import customerService from "../Assets/images/Icon-Customer service.png";
import delivery from "../Assets/images/icon-delivery.png";
import secure from "../Assets/images/Icon-secure.png";

const navLinks = [
  { id: 1, link: "Home", path: "/" },
  { id: 3, link: "About Us", path: "/about" },
  { id: 4, link: "Contact", path: "/contact" },
];

const hife = [
  { id: 1, link: "FAQ", path: "/" },
  { id: 2, link: "AGB", path: "/products" },
  { id: 3, link: "Sitemap", path: "/about" },
  { id: 4, link: "Impressum", path: "/contact" },
  { id: 5, link: "Widerruf", path: "/" },
  { id: 6, link: "Datenschutz", path: "/products" },
];

const adminLinks = [
  { id: 1, path: "/", link: "Categories", icon: <BiCategory /> },
  { id: 3, path: "/products", link: "Products", icon: <FaProductHunt /> },
];

const desktopNavbar = [
  { id: 1, href: "/", link: "Home" },
  { id: 2, href: "contact", link: "Contact" },
  { id: 3, href: "about", link: "About" },
];

const publicMobileNavbar = [
  { id: 1, href: "/", link: "Home" },
  { id: 2, href: "/contact", link: "Contact" },
  { id: 3, href: "/about", link: "About" },
  { id: 4, href: "/login", link: "Login" },
  { id: 5, href: "/register", link: "Register" },
];

const privateMobileNavbar = [
  { id: 1, href: "/", link: "Home" },
  { id: 2, href: "/contact", link: "Contact" },
  { id: 3, href: "/about", link: "About" },
];

const services = [
  {
    id: 1,
    icon: delivery,
    title: "free and fast delivery",
    paragraph: "Free delivery for all orders over $140",
  },
  {
    id: 2,
    icon: customerService,
    title: "24/7 CUSTOMER SERVICE",
    paragraph: "Friendly 24/7 customer support",
  },
  {
    id: 3,
    icon: secure,
    title: "MONEY BACK GUARANTEE",
    paragraph: "We reurn money within 30 days",
  },
];

export {
  navLinks,
  hife,
  adminLinks,
  desktopNavbar,
  publicMobileNavbar,
  privateMobileNavbar,
  services
};
