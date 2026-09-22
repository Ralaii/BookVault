import { BsX } from "react-icons/bs";

function Modal({ children, onClose }) {
  return(
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-black/50">
      <div className="bg-zinc-800 rounded-lg w-96 flex relative p-4">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 cursor-pointer"
        >
          <BsX className="font-bold text-white text-4xl"/>
        </button>
        <div className="flex flex-col mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;