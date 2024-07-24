import React from "react";

const ButtonDis = ({ disabled, onClick, title }) => {
  return (
    <div className=" ">
      <button
        className="bg-gray-600 py-2 px-3 text-white font-bold w-28 rounded-xl"
        disabled={disabled}
        onClick={onClick}
      >
        {title}
      </button>
    </div>
  );
};

export default ButtonDis;
