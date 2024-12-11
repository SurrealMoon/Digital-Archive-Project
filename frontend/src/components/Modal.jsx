import React from "react";
import PropTypes from "prop-types";

const Modal = ({ isOpen, title, children, onClose, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
      <div
        className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-3xl transform transition-all duration-300 overflow-y-auto"
        style={{ maxHeight: "90vh" }}
      >
        <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-6">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition duration-200"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div className="space-y-6 text-gray-700">{children}</div>
        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-600 text-white rounded-lg border border-gray-300 hover:bg-red-600 transition duration-200"
          >
            İptal
          </button>
          <button
            onClick={onSubmit}
            className="px-5 py-2 bg-yellow-400 text-white rounded-lg shadow hover:bg-emerald-600 transition duration-200"
          >
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Modal;
