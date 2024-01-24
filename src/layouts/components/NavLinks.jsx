import DropDown from "../../components/ui/DropDown";

function NavLinks({ navStyle, ulStyles, navLinks }) {
  return (
    <nav className={navStyle}>
      <ul className={ulStyles}>{navLinks}</ul>
      <DropDown />
    </nav>
  );
}

export default NavLinks;
