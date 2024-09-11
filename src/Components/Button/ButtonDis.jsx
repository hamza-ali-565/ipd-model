import React from "react";

const ButtonDis = ({ disabled, onClick, title, style }) => {
  return (
    <div className=" ">
      <button
        className={`${style} bg-gray-600 py-2 px-3 text-white font-bold rounded-xl`}
        disabled={disabled}
        onClick={onClick}
      >
        {title}
      </button>
    </div>
  );
};

export default ButtonDis;
