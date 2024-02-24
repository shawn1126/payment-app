import React from "react";
import { Alert, Backdrop, CircularProgress, Snackbar } from "@mui/material";
import { useGlobalStore } from "store/globalStore";

const GlobalRenders = ({ children }: { children: React.ReactNode }) => {
  const isLoading = useGlobalStore((state) => state.isLoading);
  const notification = useGlobalStore((state) => state.notification);
  return (
    <>
      {children}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        {isLoading && <CircularProgress color="info" />}
      </Backdrop>
      {notification.open && (
        <Snackbar
          open={notification.open}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            severity={notification.type}
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 5 }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default GlobalRenders;
