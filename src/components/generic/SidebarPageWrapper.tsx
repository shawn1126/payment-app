import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

export interface SidebarPageWrapperIProps {
  isOpen: boolean;
  onClose: () => void;
  direction?: "left" | "right" | "top" | "bottom";
  children: React.ReactNode;
}
export default function SidebarPageWrapper({
  isOpen,
  onClose,
  direction = "right",
  children,
}: SidebarPageWrapperIProps) {
  return (
    <div>
      <Drawer anchor={direction} open={isOpen} onClose={onClose}>
        <Box
          sx={{
            width: "100vw",
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
          role="presentation"
        >
          {children}
        </Box>
      </Drawer>
    </div>
  );
}
