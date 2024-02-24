import { useEffect, useState } from "react";
import { useAuthStore } from "store/authStore";

import {
  ForgotAccPassword1,
  ForgotAccPassword2,
  ForgotAccPassword3,
  ForgotPaymentCode1,
} from "components/authentication";
import ForgotPaymentCode2 from "components/authentication/ForgotPaymentCode2";
import UpdateUserEmail from "components/authentication/UpdateUserEmail";
import UpdateUserEmailVerify from "components/authentication/UpdateUserEmailVerify";
import UpdateUserName from "components/authentication/UpdateUserName";
import UpdateUserPhoneNo from "components/authentication/UpdateUserPhoneNo";

const PasswordResetModals = () => {
  const isForgetPassword1Open = useAuthStore(
    (state) => state.isForgetPassword1Open,
  );

  const isForgetPassword2Open = useAuthStore(
    (state) => state.isForgetPassword2Open,
  );

  const isForgetPassword3Open = useAuthStore(
    (state) => state.isForgetPassword3Open,
  );
  //

  const paymentCodeStep1Open = useAuthStore(
    (state) => state.paymentCodeStep1Open,
  );

  const paymentCodeStep2Open = useAuthStore(
    (state) => state.paymentCodeStep2Open,
  );

  const isUpdateUserNameOpen = useAuthStore(
    (state) => state.isUpdateUserNameOpen,
  );

  const isUpdateUserEmail = useAuthStore((state) => state.isUpdateUserEmail);
  const isUpdateUserPhoneNo = useAuthStore(
    (state) => state.isUpdateUserPhoneNo,
  );
  const isUpdateEmailVerifyOpen = useAuthStore(
    (state) => state.isUpdateEmailVerifyOpen,
  );

  //
  const [forgotAccPassword1Open, setForgotAccPassword1Open] = useState(false);
  const [forgotAccPassword2Open, setForgotAccPassword2Open] = useState(false);
  const [forgotAccPassword3Open, setForgotAccPassword3Open] = useState(false);

  const [forgotPaymentCode1Open, setForgotPaymentCode1Open] = useState(false);
  const [forgotPaymentCode2Open, setForgotPaymentCode2Open] = useState(false);

  const [updateUserNameOpen, setUpdateUserNameOpen] = useState(false);
  const [updateUserEmailOpen, setUpdateUserEmailOpen] = useState(false);
  const [updateUserPhoneNoOpen, setUpdateUserPhoneNoOpen] = useState(false);
  const [updateEmailVerifyOpen, setUpdateEmailVerifyOpen] = useState(false);

  useEffect(() => {
    if (isForgetPassword1Open) {
      setForgotAccPassword1Open(true);
    } else if (isForgetPassword2Open) {
      setForgotAccPassword2Open(true);
    } else if (isForgetPassword3Open) {
      setForgotAccPassword3Open(true);
    } else if (paymentCodeStep1Open) {
      setForgotPaymentCode1Open(true);
    } else if (paymentCodeStep2Open) {
      setForgotPaymentCode2Open(true);
    } else if (isUpdateUserNameOpen) {
      setUpdateUserNameOpen(true);
    } else if (isUpdateUserEmail) {
      setUpdateUserEmailOpen(true);
    } else if (isUpdateEmailVerifyOpen) {
      setUpdateEmailVerifyOpen(true);
    } else if (isUpdateUserPhoneNo) {
      setUpdateUserPhoneNoOpen(true);
    }
  }, [
    isForgetPassword1Open,
    isForgetPassword2Open,
    isForgetPassword3Open,
    paymentCodeStep1Open,
    paymentCodeStep2Open,
    isUpdateUserNameOpen,
    isUpdateUserEmail,
    isUpdateEmailVerifyOpen,
    isUpdateUserPhoneNo,
  ]);

  return (
    <>
      {isForgetPassword1Open && (
        <ForgotAccPassword1 open={forgotAccPassword1Open} />
      )}
      {isForgetPassword2Open && (
        <ForgotAccPassword2 open={forgotAccPassword2Open} />
      )}
      {isForgetPassword3Open && (
        <ForgotAccPassword3 open={forgotAccPassword3Open} />
      )}
      {paymentCodeStep1Open && (
        <ForgotPaymentCode1 open={forgotPaymentCode1Open} />
      )}
      {paymentCodeStep2Open && (
        <ForgotPaymentCode2 open={forgotPaymentCode2Open} />
      )}
      {isUpdateUserNameOpen && <UpdateUserName open={updateUserNameOpen} />}
      {isUpdateUserEmail && <UpdateUserEmail open={updateUserEmailOpen} />}
      {isUpdateUserPhoneNo && (
        <UpdateUserPhoneNo open={updateUserPhoneNoOpen} />
      )}
      {isUpdateEmailVerifyOpen && (
        <UpdateUserEmailVerify open={updateEmailVerifyOpen} />
      )}
    </>
  );
};

export default PasswordResetModals;
