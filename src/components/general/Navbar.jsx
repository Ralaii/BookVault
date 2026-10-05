import { useState } from "react";
import { BiLibrary } from "react-icons/bi";
import { BsCollection, BsCompass, BsGrid, BsMoon, BsSearch, BsSun } from "react-icons/bs";
import { Link } from "react-router-dom";
import logo from "../../assets/imgs/BookVaultLogo.jpg";
import { RiMoonLine } from "react-icons/ri";
import LoginModal from "../auth/LoginModal";
import RegisterModal from "../auth/RegisterModal";
import useAuth from "../../hooks/auth/useAuth";

function Navbar() {
  const {
    handleLogin,
    handleRegister
  } = useAuth();

  const [ isDark, setIsDark ] = useState(
    document.documentElement.classList.contains("dark")
  );
  const [ activeModal, setActiveModal ] = useState(null);

  const toggleTheme = () => {
    const dark = document.documentElement.classList.toggle("dark")
    setIsDark(dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light")
    } catch (error) {
      throw new Error(error.message)
    }
  } 

  return (
    <>
    <nav className="border-b border-zinc-200 dark:border-zinc-700">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-6 font-sans font-semibold">
          <Link to="/" className="flex items-center gap-1.5">
          <img src={logo} alt="BookVault" className="h-8"/>
          <h2 className="text-2xl font-sans">BookVault</h2>
        </Link>

        <Link 
          to="/" 
          className="flex items-center gap-1"
        >
          <BsCompass/> Browse
        </Link>

        <Link 
          to="/" 
          className="flex items-center gap-1"
        >
          <BiLibrary/> Library
        </Link>

        <Link
          to="/"
          className="flex items-center gap-1"
        >
          <BsCollection/> Series
        </Link>
      </div>

      <div className="flex gap-3 items-center text-white">
        <input
          type="search" 
          className="bg-zinc-100 text-zinc-900 placeholder:text-zinc-500
             border border-zinc-300 rounded-lg px-3 py-2.5 w-72
             focus:outline-none focus:ring-2 focus:ring-red-500
             dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-400
             dark:border-zinc-700"
          placeholder="Search..."
        />
        <button
          onClick={() => toggleTheme()}
          className="bg-zinc-100 text-zinc-700 border border-zinc-300 hover:bg-zinc-200
             px-3.5 py-3.5 rounded cursor-pointer
             dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700 dark:hover:bg-zinc-700"
        >
          {isDark ? <BsSun/> : <RiMoonLine/>}
        </button>

        <button
          onClick={() => setActiveModal('login')}
          className="bg-red-500 px-6 py-2.5 rounded cursor-pointer"
        >
          Login
        </button>
        </div>
      </div>
      
    </nav>  
        {activeModal === "login" && (
        <LoginModal
          onClose={() => setActiveModal(null)}
          onSwitchToRegister={() => setActiveModal('register')}
          onLogin={async (data) => {
            const result = await handleLogin(data);
            if (result?.success !== false) setActiveModal(null);
          } 
        }
        />
      )}
      {activeModal === "register" && (
        <RegisterModal
          onClose={() => setActiveModal(null)}
          onSwitchToLogin={() => setActiveModal('login')}
          onRegister={async (data) => {
            const result = await handleRegister(data);
            if (result?.success !== false) setActiveModal('login')
          }
        }
        />
      )}
    </>
  );
}

export default Navbar;