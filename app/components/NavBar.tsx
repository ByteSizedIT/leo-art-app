import Logo from "../components/Logo";
import Burger from "./Burger";
import NavBarElements from "./NavBarElements";

const NavBar = () => {
  return (
    <nav className="relative w-full flex items-center p-5 z-10">
      <Logo />
      <NavBarElements />
      <Burger />
    </nav>
  );
};
export default NavBar;
