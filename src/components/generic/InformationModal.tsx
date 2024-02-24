import React from "react";
import { Box, Modal } from "@mui/material";

interface InformationModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function InformationModal({ open, onClose, children }: InformationModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        // make z index lower than backdrop
        zIndex: 1200,
      }}
    >
      <Box sx={style}>{children}</Box>
    </Modal>
  );
}

export default InformationModal;

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 250,
  bgcolor: "white",
  boxShadow: "0px 30px 60px 0px rgba(138, 149, 158, 0.20);",
  pt: "25px",
  pb: "30px",
  px: "20px",
  borderRadius: "20px",
};
