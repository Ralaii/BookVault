import { BiLibrary } from "react-icons/bi";
import { BsCollection, BsCompass } from "react-icons/bs";
import { Link } from "react-router-dom";

export const navLinks = [
  { to: "/", label: "Browse", icon: <BsCompass /> },
  { to: "/", label: "Library", icon: <BiLibrary /> },
  { to: "/", label: "Series", icon: <BsCollection /> },
];
function NavLinks() {

  return (
    <div className="hidden md:flex items-center gap-4 lg:gap-6">
      {navLinks.map(({ to, label, icon }) => (
        <Link
          key={label}
          to={to}
          title={label}
          aria-label={label}
          className="flex items-center gap-1.5"
        >
          <span className="text-xl lg:text-base">{icon}</span>
          <span className="hidden lg:inline">{label}</span>
        </Link>
      ))}
    </div>
  );
}

export default NavLinks;