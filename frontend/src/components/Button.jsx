import React from "react";

function Button({ className, children, type = "Button", ...props }) {
  return (
    <button
      className={`w-full bg-[#383737] px-3 py-2 sm:w-auto sm:bg-transparent ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;