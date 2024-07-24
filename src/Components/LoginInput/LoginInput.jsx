import React from "react";

const LoginInput = ({ placeholder, icon, onChange, type, value }) => {
  return (
    <div className="grid grid-cols-[1fr,auto] border-2 border-gray-500 rounded-2xl w-full p-3">
      <input
        type={type}
        placeholder={placeholder}
        className="outline-none bg-transparent"
        onChange={onChange}
        value={value}
      />
      <i class={`${icon} text-2xl`}></i>
    </div>
  );
};

export default LoginInput;
