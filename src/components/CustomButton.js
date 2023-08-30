import React from "react";

const CustomButton = ({ title, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${className} transition-all duration-300 ease-in-out hover:bg-secoundry hover:border-secoundry bg-primary py-2 px-8 rounded-md mx-3 text-white`}
    >
      {title}
    </button>
  );
};

export default CustomButton;
