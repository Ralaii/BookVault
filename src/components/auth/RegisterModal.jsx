import { useState } from "react";
import Modal from "../general/Modal";
import { BsDiscord, BsGoogle } from "react-icons/bs";

function RegisterModal({ onClose, onSwitchToLogin, onRegister }) {
  const [ errors, setErrors ] = useState([]);
  const [ formData, setFormData ] = useState({
      email: "",
      username: "",
      password: "",
      confirmPassword: ""
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
  
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      e.stopPropagation();

      const result = await onRegister(formData);
      if (result?.errors) {
        setErrors(result.errors)
      }
    }
  return(
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col justify-center items-center">
              <h2 className="font-sans font-semibold text-white text-3xl">Sign Up</h2>
              <p className="mt-1 text-sm text-zinc-400">Enter your details to create your account</p>
            </div>
      
              <div className="mt-3 mb-3 gap-1.5 flex flex-col">
                <label 
                  htmlFor="email"
                  className="font-sans"
                >Email
                </label>
                <input 
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="bg-zinc-700 rounded px-3 py-1 border border-solid border-zinc-700 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/30"
                />
              </div>

              {/* ERROR FOR EMAIL */}
              {errors.find(e => e.path[0] === 'email') && (
                <p className="text-red-500 text-xs">
                  {errors.find(e => e.path[0] === 'email')?.message}
                </p>
              )}

              <div className="mt-3 mb-3 gap-1.5 flex flex-col">
                <label 
                  htmlFor="username"
                  className="font-sans"
                >Username
                </label>
                <input 
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                  className="bg-zinc-700 rounded px-3 py-1 border border-solid border-zinc-700 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/30"
                />
              </div>

              {/* ERROR FOR USERNAME */}
              {errors.find(e => e.path[0] === 'username') && (
                <p className="text-red-500 text-xs">
                  {errors.find(e => e.path[0] === 'username')?.message}
                </p>
              )}
      
              <div className="mt-3 mb-3 gap-1.5 flex flex-col">
                <label 
                  htmlFor="password"
                  className="font-sans"
                >Password
                </label>
                <input 
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="bg-zinc-700 rounded px-3 py-1 border border-solid border-zinc-700 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/30"
                />
              </div>

              {/* ERROR MESSAGE FOR PASSWORD */}
              {errors.find(e => e.path[0] === 'password') && (
                <p className="text-red-500 text-xs">
                  {errors.find(e => e.path[0] === 'password')?.message}
                </p>
              )}

              <div className="mt-3 mb-3 gap-1.5 flex flex-col">
                <label 
                  htmlFor="confirmPassword"
                  className="font-sans"
                >Confirm Password
                </label>
                <input 
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="bg-zinc-700 rounded px-3 py-1 border border-solid border-zinc-700 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/30"
                />
              </div>

              {/* ERROR MESSAGE FOR CONFIRM PASSWORD */}
              {errors.find(e => e.path[0] === 'confirmPassword') && (
                <p className="text-red-500 text-xs">
                  {errors.find(e => e.path[0] === 'confirmPassword')?.message}
                </p>
              )}

              <button
                type="submit"
                className="flex justify-center mx-auto w-full items-center bg-red-700 px-3 py-2 rounded-lg cursor-pointer"
              >
                Register
              </button>
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-zinc-600"></div>
                  <span className="text-gray-500 text-sm">or</span>
                <div className="flex-1 h-px bg-zinc-600"></div>
              </div>
      
              <div className="flex gap-2 w-full">
                <button className="flex items-center justify-center gap-3 bg-gray-500 px-3 py-1 rounded-lg w-full"
                  type="button">
                    <BsGoogle/> Google
                </button>
                <button className="flex items-center justify-center gap-3 bg-gray-500 px-3 py-1 rounded-lg w-full"
                  type="button">
                  <BsDiscord/> Discord
                </button>
              </div>
      
              <div className="flex justify-center items-center text-sm py-2 gap-1 mt-3">
                <p>Already have an account?</p>
                <button type="button" onClick={onSwitchToLogin} className="text-red-500 underline cursor-pointer">Login</button>
              </div>
      </form>
    </Modal>
  );
}

export default RegisterModal;