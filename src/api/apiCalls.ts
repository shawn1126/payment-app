import { SearchedContactInputType } from "store/transferStore";

import {
  createNewPaymentPasswordInputType,
  emailPassVerifyInputType,
  emailPassVerifyOutputType,
  forgotEmailPassInputType,
  forgotEmailPassOutputType,
  FriendInputType,
  GoogleSignupType,
  LoginInputType,
  phoneNoEmailVerificationInputType,
  phoneNoSMSVerificationInputType,
  RegisterInputType,
  RegisterOutputType,
  resetNewPhoneNoInputType,
  resetOldEmailVerify,
  resetPassInputType,
  resetPassOutputType,
  transferPointsInputType,
} from "./apiTypes";
import { Axios } from "./axiosInstance";

export const Register = async (data: RegisterInputType) => {
  return (await Axios.post<RegisterOutputType>("/register", data)).data;
};

export const Login = async (data: LoginInputType) => {
  return (await Axios.post("/login", data)).data;
};

export const ForgotEmailPassword = async (data: forgotEmailPassInputType) => {
  return (await Axios.post<forgotEmailPassOutputType>("/forgotpwdEmail", data))
    .data;
};

export const EmailPasswordVerify = async (data: emailPassVerifyInputType) => {
  return (
    await Axios.post<emailPassVerifyOutputType>(
      "/forgotpwdVerificationEmail",
      data,
    )
  ).data;
};

export const ResetPassword = async (data: resetPassInputType) => {
  return (await Axios.post<resetPassOutputType>("/resetPassword", data)).data;
};

export const googleSignupByEmail = async (data: GoogleSignupType) => {
  return (await Axios.post("/googleregister", data)).data;
};

export const googleLoginByEmail = async (email: string) => {
  return (await Axios.post("/googlelogin", { email })).data;
};

export const sendEmailCodeForPaymentPasswordReset = async (
  email: string,
  uuid: string,
) => {
  return (await Axios.post("/forgotPaymentPwdEmail", { email, uuid })).data;
};
export const sendSmsCodeForPaymentPasswordReset = async (uuid: string) => {
  return (await Axios.post("/forgotPaymentpwdSMS", { uuid })).data;
};

export const verifyEmailCodeForPaymentPasswordReset = async (
  verification_code: string,
  uuid: string,
) => {
  return (
    await Axios.post("/forgotPaymentpwdVerificationEmail", {
      verification_code,
      uuid,
    })
  ).data;
};

export const verifySmsCodeForPaymentPasswordReset = async (
  verification_code: string,
  uuid: string,
) => {
  return (
    await Axios.post("/forgotPaymentpwdVerificationSMS", {
      verification_code,
      uuid,
    })
  ).data;
};

export const createNewPaymentPassword = async (
  data: createNewPaymentPasswordInputType,
) => {
  return (await Axios.post("/resetPaymentPassword", data)).data;
};

export const transferPointsApi = async (data: transferPointsInputType) => {
  return (await Axios.post("/transfer", data)).data;
};

export const resendEmailVerificationCode = async (email: string) => {
  return (await Axios.post("/RegisterEmail", { email })).data;
};

export const verifyEmailCode = async (data: {
  email: string;
  verification_code: string;
}) => {
  return (await Axios.post("/RegisterVerificationEmail", data)).data;
};

export const resetUserName = async (data: {
  username: string;
  uuid: string;
}) => {
  return (await Axios.post<resetPassOutputType>("/resetUserName", data)).data;
};

export const resetUserEmail = async (data: {
  newEmail: string;
  uuid: string;
}) => {
  return (await Axios.post("/resetEmailVerficationEmail", data)).data;
};

export const verifyResetUserEmail = async (data: {
  newEmail: string;
  verification_code: string;
  new_verification_code: string;
  uuid: string;
}) => {
  return (await Axios.post("/resetEmailVerfication", data)).data;
};

export const addFriend = async (data: FriendInputType) => {
  return (await Axios.post("/addFriend", data)).data;
};

export const phoneNoEmailVerify = async (
  data: phoneNoEmailVerificationInputType,
) => {
  return (await Axios.post("/resetNewPhoneNumberEmailVerification", data)).data;
};
export const phoneNoSmsVerify = async (
  data: phoneNoSMSVerificationInputType,
) => {
  return (await Axios.post("/resetNewPhoneNumberSMSVerification", data)).data;
};
export const resetUserPhoneNo = async (data: resetNewPhoneNoInputType) => {
  return (await Axios.post("/resetNewPhoneNumberVerified", data)).data;
};

export const getFriends = async ({
  email,
  phone,
  uid,
}: SearchedContactInputType) => {
  return (
    await Axios.post("/queryUserCredientails", {
      email: email,
      phonenumber: phone,
      uuid: uid,
    })
  ).data;
};

export const sendWithdrawEmail = async (data: {
  email: string;
  uuid: string;
}) => {
  return (await Axios.post("/withdrawlEmailVerification", data)).data;
};

export const sendWithdrawSms = async (data: { uuid: string }) => {
  return (await Axios.post("/withdrawlSMSVerification", data)).data;
};

export const processWithdraw = async (data: {
  withdrawlSMSVerificationCode: string;
  withdrawlEmailVerificationCode: string;
  uuid: string;
}) => {
  return (await Axios.post("/withdrawlVerification", data)).data;
};

export const verifyOldEmail = async ({ uuid }: resetOldEmailVerify) => {
  return (
    await Axios.post("/resetEmailVerficationOldEmail", {
      uuid: uuid,
    })
  ).data;
};
