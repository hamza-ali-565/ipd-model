import React from "react";

const LabelledTextArea = ({ label, placeholder, onChange, value }) => {
  return (
    <div className="flex flex-col items-center space-y-1">
      <p className="font-bold text-xl">{label}</p>
      <textarea
        name=""
        id=""
        rows={"4"}
        cols={"40"}
        className="border-2 border-black bg-transparent rounded-xl p-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      ></textarea>
    </div>
  );
};

export default LabelledTextArea;
