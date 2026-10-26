import LoginModal from "../../auth/LoginModal";
import RegisterModal from "../../auth/RegisterModal";
import useAuth from "../../../hooks/auth/useAuth";

function AuthModals({ activeModal, setActiveModal }) {
  const { handleLogin, handleRegister } = useAuth();
  const close = () => setActiveModal(null);

  if (activeModal === "login") {
    return (
      <LoginModal
        onClose={close}
        onSwitchToRegister={() => setActiveModal("register")}
        onLogin={async (data) => {
          const result = await handleLogin(data);
          if (result?.success !== false) close();
        }}
      />
    );
  }

  if (activeModal === "register") {
    return (
      <RegisterModal
        onClose={close}
        onSwitchToLogin={() => setActiveModal("login")}
        onRegister={async (data) => {
          const result = await handleRegister(data);
          if (result?.success !== false) setActiveModal("login");
        }}
      />
    );
  }

  return null;
}

export default AuthModals;