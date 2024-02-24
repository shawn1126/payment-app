import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "store/authStore";

import {
  AuthLanguageSelector,
  Login,
  RegisterDefault,
  RegisterGoogle,
} from "components/authentication";
import VerifyEmail from "components/authentication/VerifyEmail";

const Auth = () => {
  const [registerDefaultOpen, setRegisterDefaultOpen] = useState(false);
  const [registerGoogleOpen, setRegisterGoogleOpen] = useState(false);
  const [verifyEmailOpen, setVerifyEmailOpen] = useState(false);

  const userEmailAndUid = useAuthStore((state) => state.userEmailAndUid);
  const navigate = useNavigate();

  const isGeneralRegisterOpen = useAuthStore(
    (state) => state.isGeneralRegisterOpen,
  );
  const isGoogleRegisterOpen = useAuthStore(
    (state) => state.isGoogleRegisterOpen,
  );
  const isEmailVerificationModalOpen = useAuthStore(
    (state) => state.isEmailVerificationModalOpen,
  );

  useEffect(() => {
    if (isGeneralRegisterOpen) {
      setRegisterDefaultOpen(true);
    } else if (isGoogleRegisterOpen) {
      setRegisterGoogleOpen(true);
    } else if (isEmailVerificationModalOpen) {
      setVerifyEmailOpen(true);
    }
  }, [
    isGeneralRegisterOpen,
    isGoogleRegisterOpen,
    isEmailVerificationModalOpen,
  ]);

  useEffect(() => {
    if (userEmailAndUid?.email && userEmailAndUid?.uid) {
      navigate("/home");
    }
  }, [userEmailAndUid]);

  return (
    <div>
      <AuthLanguageSelector />
      <Login />
      {isGeneralRegisterOpen && <RegisterDefault open={registerDefaultOpen} />}
      {isGoogleRegisterOpen && <RegisterGoogle open={registerGoogleOpen} />}
      {isEmailVerificationModalOpen && <VerifyEmail open={verifyEmailOpen} />}
    </div>
  );
};

export default Auth;
