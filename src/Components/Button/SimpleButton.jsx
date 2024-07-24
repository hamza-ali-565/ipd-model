import React from "react";

const SimpleButton = ({ onClick, title }) => {
  return (
    <div
      className="bg-gray-500 py-2 px-4 rounded-2xl cursor-pointer font-bold "
      onClick={onClick}
    >
      {title}
    </div>
  );
};

export default SimpleButton;
