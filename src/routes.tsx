import { createBrowserRouter } from "react-router-dom";
import Auth from "pages/Auth";
import Home from "pages/Home";
import Profile from "pages/Profile";
import TransactionHistory from "pages/TransactionHistory";
import PasswordResetModals from "utils/PasswordResetModals";
import ProtectedRoute from "utils/ProtectedRoute";

import { BottomNavigtion, ContactList } from "components/generic";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Auth />
        <PasswordResetModals />
      </>
    ),
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
        <BottomNavigtion />
      </ProtectedRoute>
    ),
  },
  {
    path: "/transaction",
    element: (
      <ProtectedRoute>
        <TransactionHistory />
        <BottomNavigtion />
      </ProtectedRoute>
    ),
  },
  {
    path: "/contact",
    element: (
      <>
        <ContactList />
        <BottomNavigtion />
      </>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
        <BottomNavigtion />
        <PasswordResetModals />
      </ProtectedRoute>
    ),
  },
]);

export default router;
