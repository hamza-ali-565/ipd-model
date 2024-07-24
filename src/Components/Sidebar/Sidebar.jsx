import React, { useState } from "react";
import SidebarButton from "../Button/SidebarButton";
import SidebarItems from "../SidebarItems/SidebarItems";

const Sidebar = ({ children, buttonTitle }) => {
  const [showIpd, setShowIPD] = useState(false);
  return (
    <div>
      <div className="border-b-2  transition-all duration-2000 ease-in p-2 ">
        <SidebarButton
          title={buttonTitle}
          onClick={() => setShowIPD(!showIpd)}
        />
        {showIpd === true && <div>{children}</div>}
      </div>
    </div>
  );
};

export default Sidebar;
