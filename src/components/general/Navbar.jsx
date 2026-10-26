import { useState } from "react";
import { Link } from "react-router-dom";
import { BsList, BsX } from "react-icons/bs";
import logo from "../../assets/imgs/BookVaultLogo.jpg";
import useTheme from "../../hooks/useTheme";
import SearchInput from "./SearchInput";
import MobileMenu from "./nav/NavMobileMenu";
import AuthModals from "./nav/AuthModal";
import ThemeToggle from "./nav/navToggle";
import NavLinks from "./nav/NavLinks";

function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  return (
    <>
      <nav className="border-b border-zinc-200 dark:border-zinc-700">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-6">

          {/* LEFT: hamburger (mobile) + logo + links (tablet/desktop) */}
          <div className="flex items-center gap-3 font-sans font-semibold md:gap-5 lg:gap-6">
            <button
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Toggle menu"
              className="text-2xl cursor-pointer md:hidden"
            >
              {menuOpen ? <BsX /> : <BsList />}
            </button>

            <Link to="/" className="flex items-center gap-1.5">
              <img src={logo} alt="BookVault" className="h-8" />
              <h2 className="text-2xl font-sans">BookVault</h2>
            </Link>

            <NavLinks/>
          </div>

          {/* RIGHT: search (tablet/desktop) + theme + login */}
          <div className="flex items-center gap-3">
            <SearchInput className="hidden md:block md:w-44 lg:w-72" />
            <ThemeToggle isDark={isDark} onToggle={toggleTheme}/>
            <button
              onClick={() => setActiveModal("login")}
              className="bg-white text-zinc-700 border border-zinc-300 hover:bg-zinc-200
                px-3.5 py-2.5 rounded cursor-pointer
                dark:bg-red-500 dark:text-white dark:border-red-500 dark:hover:bg-red-600"
            >
              Login
            </button>
          </div>
        </div>

        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      </nav>

      <AuthModals activeModal={activeModal} setActiveModal={setActiveModal} />
    </>
  );
}

export default Navbar;