import React from "react";

const ModalWrapper = ({ title, emoji, children, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/75 bg-opacity-30 flex justify-center items-center">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-2 right-4 text-2xl font-bold text-gray-400 hover:text-gray-700">&times;</button>
        <h2 className="text-2xl font-bold text-center mb-4 text-indigo-600">
          <span className="text-3xl">{emoji}</span> {title}
        </h2>
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
