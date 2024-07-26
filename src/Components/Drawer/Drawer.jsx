import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ServiceModal from "../Modal/ServiceModal";
import IPDRadioModal from "../Modal/IPDRadioModal";

export default function Drawer({
  onClick,
  modalAdmissionNo,
  patientName,
  onClickModalItem,
  Party,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (value) => {
    onClick(value);
    if (value === "Close") {
      setAnchorEl(null);
    }
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <p className="text-3xl">|||</p>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleClose("service")}>
          <ServiceModal
            title={"Services"}
            modalAdmissionNo={modalAdmissionNo}
            patientName={patientName}
            onClick={onClickModalItem}
            Party={Party}
          />
        </MenuItem>
        <MenuItem onClick={() => handleClose("lab")}>
          <IPDRadioModal
            title={"Radiology"}
            modalAdmissionNo={modalAdmissionNo}
            patientName={patientName}
            onClick={onClickModalItem}
            party={Party}
          />
        </MenuItem>
        <MenuItem onClick={() => handleClose("med")}>Medicines</MenuItem>
        <MenuItem onClick={() => handleClose("radio")}>Radiology</MenuItem>
        <MenuItem onClick={() => handleClose("view")}>View History</MenuItem>
        <MenuItem
          onClick={() => handleClose("Close")}
          style={{ fontWeight: "bold", color: "red" }}
        >
          Close Menu
        </MenuItem>
      </Menu>
    </div>
  );
}
