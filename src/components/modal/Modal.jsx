import { LiaTimesSolid } from "react-icons/lia";


const Modal = ({isOpen, onClose, title, children}) => {
    if(!isOpen) return null;
  return (
      
    <>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-500"
                >
                    <LiaTimesSolid />
                </button>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
                <div>{children}</div>
            </div>
        </div>
    </>
  )
}

export default Modal;
