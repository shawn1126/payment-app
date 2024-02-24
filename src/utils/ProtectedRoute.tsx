import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "store/authStore";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const userEmailAndUid = useAuthStore((state) => state.userEmailAndUid);

  useEffect(() => {
    if (
      !userEmailAndUid?.email &&
      !userEmailAndUid?.uid &&
      !localStorage.getItem("user")
    ) {
      // get the query params, transferTo, and if it exists, navigate to /?
      // transferTo=transferTo
      const searchParams = new URLSearchParams(window.location.search);
      const transferTo = searchParams.get("transferTo");
      if (transferTo) {
        navigate(`/?transferTo=${transferTo}`);
      } else {
        navigate("/");
      }
    }
  }, [userEmailAndUid]);

  return children;
};

export default ProtectedRoute;
