import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  p: 4,
  border: "none",
};

export default function Loader({ onClick, title }) {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={onClick}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-center flex-col h-full items-center">
            <CircularProgress />
            <p className="mt-2 font-bold text-white">{title}</p>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
