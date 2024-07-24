import React from "react";

const InputButton = ({ onChange, onClick, type, placeholder, value }) => {
  return (
    <div className="flex justify-center my-4 space-x-3">
      <input
        type={type}
        name=""
        id=""
        placeholder={placeholder}
        className="w-40 px-2 border-2 border-gray-500 rounded-2xl md:w-72"
        onChange={onChange}
        value={value}
      />
      <button
        onClick={onClick}
        className="py-1 px-4 rounded-2xl text-black font-bold bg-gray-400 border-2 border-gray-500"
      >
        Submit
      </button>
    </div>
  );
};

export default InputButton;
