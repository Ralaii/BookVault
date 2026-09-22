import { useNavigate } from "react-router-dom"
import { loginSchema, registerSchema } from "../../validation/validation"
import useAuthStore from "../../store/authStore";
import { loginService, registerService } from "../../services/authService";
import { toast } from 'sonner';

function useAuth() {
  const navigate = useNavigate();
  const { setRole } = useAuthStore();

  /* LOGIN VALIDATION */
  const handleLogin = async (formData) => {
    try {
      const data = await loginService(formData);

      setRole(data.user.role)
      toast.success(`Welcome Back! ${data.user.username}!`)
      navigate('/');
      
    } catch (error) {
      toast.error(error.message);
    }
  }

  /* REGISTER VALIDATION */
  const handleRegister = async (data) => {
    const result = registerSchema.safeParse(data);

    if (!result.success) {
      return { errors: result.error.errors }
    }

    try {
      const response = await registerService(data)
      toast.success('Registration Successfull!');
      navigate('/')
    } catch (error) {
      toast.error(error.message)
    }
  }
  
  return {
    handleLogin,
    handleRegister
  }
}

export default useAuth;