function NavLinks({ navStyle, ulStyles, navLinks }) {
  return (
    <nav className={navStyle}>
      <ul className={ulStyles}>{navLinks}</ul>
    </nav>
  );
}

export default NavLinks;
