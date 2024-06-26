import { FaProductHunt } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { IoIosAddCircleOutline } from "react-icons/io";

const navLinks = [
  { id: 1, link: "Home", path: "/" },
  { id: 2, link: "Products", path: "/products" },
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
  { id: 2, path: "/add-category", link: "Add Category", icon: <IoIosAddCircleOutline /> },
  { id: 3, path: "/products", link: "Products", icon: <FaProductHunt /> },
  { id: 4, path: "/add-product", link: "Add Product", icon:<IoIosAddCircleOutline /> },
];

export { navLinks, hife, adminLinks };
