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

  const [ darkMode, setDarkMode ] = useState(false);
  const [ isLoginOpen, setIsLoginOpen ] = useState(false);
  const [ isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleSwitch = (modal) => {
    setIsLoginOpen(modal === 'login');
    setIsRegisterOpen(modal === 'register');
  }
  return (
    <>
    <nav className="border-b border-zinc-700">
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
          className="bg-zinc-800 rounded-lg placeholder: px-3 py-2.5 w-72"
          placeholder="Search..."
        />
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-zinc-800 px-3.5 py-3.5 rounded cursor-pointer"
        >
          {darkMode ? <BsSun/> : <RiMoonLine/>}
        </button>

        <button
          onClick={() => setIsLoginOpen(true)}
          className="bg-red-500 px-6 py-2.5 rounded cursor-pointer"
        >
          Login
        </button>
        </div>
      </div>
      
    </nav>  
        {isLoginOpen && (
        <LoginModal
          onClose={() => setIsLoginOpen(false)}
          onSwitchToRegister={() => handleSwitch('register')}
          onLogin={handleLogin}
        />
      )}
      {isRegisterOpen && (
        <RegisterModal
          onClose={() => setIsRegisterOpen(false)}
          onSwitchToLogin={() => handleSwitch('login')}
          onRegister={handleRegister}
        />
      )}
    </>
  );
}

export default Navbar;