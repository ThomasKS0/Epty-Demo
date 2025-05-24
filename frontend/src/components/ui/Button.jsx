import React from "react";

function Button({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 bg-blue-600 cursor-pointer rounded-lg hover:bg-blue-700 transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
export { Button };
