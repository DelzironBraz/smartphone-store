import { IoPhonePortraitSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-screen bg-primary flex justify-center items-center gap-1 py-5">
      <NavLink to="/" className="flex justify-center items-center gap-1">
        <span className="font-bold text-white text-5xl">M</span>
        <IoPhonePortraitSharp size={34} color="white" />
      </NavLink>
    </header>
  );
};

export default Header;
