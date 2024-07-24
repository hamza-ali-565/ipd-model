import React from "react";

const SidebarButton = ({ onClick, title }) => {
  return (
    <div
      className="flex justify-around p-2 rounded hover:bg-gray-300 transition-all duration-2000 ease-in cursor-pointer "
      onClick={onClick}
    >
      <button className="font-bold">{title}</button>
      <i class="bi bi-chevron-compact-down"></i>
    </div>
  );
};

export default SidebarButton;
