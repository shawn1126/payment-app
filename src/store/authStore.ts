import {
  createNewPaymentPassword,
  EmailPasswordVerify,
  ForgotEmailPassword,
  googleLoginByEmail,
  googleSignupByEmail,
  Login,
  phoneNoEmailVerify,
  phoneNoSmsVerify,
  Register,
  resendEmailVerificationCode,
  ResetPassword,
  resetUserEmail,
  resetUserName,
  resetUserPhoneNo,
  sendEmailCodeForPaymentPasswordReset,
  sendSmsCodeForPaymentPasswordReset,
  verifyEmailCode,
  verifyEmailCodeForPaymentPasswordReset,
  verifyOldEmail,
  verifyResetUserEmail,
  verifySmsCodeForPaymentPasswordReset,
} from "api/apiCalls";
import {
  LoginInputType,
  LoginOutputType,
  RegisterInputType,
} from "api/apiTypes";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { create } from "zustand";

import { auth } from "../../firebaseConfig";

import { useGlobalStore } from "./globalStore";

interface AuthState {
  isGeneralRegisterOpen: boolean;
  isGoogleRegisterOpen: boolean;
  isForgetPassword1Open: boolean;
  isForgetPassword2Open: boolean;
  isForgetPassword3Open: boolean;
  isLoginOpen: boolean;
  isLanguageModalOpen: boolean;
  isEmailVerificationModalOpen: boolean;
  isUpdateUserNameOpen: boolean;
  isUpdateUserEmail: boolean;
  isUpdateEmailVerifyOpen: boolean;
  openUpdateEmailVerify: () => void;
  closeUpdateEmailVerify: () => void;
  openLanguageModal: () => void;
  closeLanguageModal: () => void;
  openEmailVerificationModal: () => void;
  closeEmailVerificationModal: () => void;
  enteredEmail: string;
  codeSentOn: number;

  // payment code related code below
  paymentCodeStep1Open: boolean;
  paymentCodeStep2Open: boolean;
  paymentCodeSentOn: number;
  eneteredVerificationCode: string | null;
  // end

  setEnteredEmail: (email: string) => void;

  setCodeSentOn: (time: number) => void;
  isUpdateUserPhoneNo: boolean;
  openGeneralRegister: () => void;
  openGoogleRegister: () => void;
  openForgetPassword1: () => void;
  openForgetPassword2: () => void;
  openForgetPassword3: () => void;
  closeGeneralRegister: () => void;
  closeGoogleRegister: () => void;
  closeForgetPassword1: () => void;
  closeForgetPassword2: () => void;
  closeForgetPassword3: () => void;
  //  payment code related code below
  openPaymentCodeStep1: () => void;
  openPaymentCodeStep2: () => void;
  closePaymentCodeStep1: () => void;
  closePaymentCodeStep2: () => void;
  openUpdateUserName: () => void;
  closeUpdateUserName: () => void;
  openUpdateUserEmail: () => void;
  closeUpdateUserEmail: () => void;
  openUpdateUserPhoneNo: () => void;
  closeUpdateUserPhoneNo: () => void;
  setPaymentCodeSentOn: (time: number) => void;
  // end
  user: LoginOutputType["userData"] | null;
  setUser: (data: LoginOutputType["userData"]) => void;
  register: (data: RegisterInputType) => Promise<void>;
  login: (data: LoginInputType) => Promise<boolean>;
  forgotEmailPassword: (data: string) => Promise<boolean>;
  emailPasswordVerify: (data: string) => Promise<boolean>;
  resetPassword: (
    password: string,
    confirmPassword: string,
  ) => Promise<boolean>;
  resetPhoneNo: () => Promise<void>;
  userEmailAndUid: { email: string; uid: string } | null;
  setUserEmailAndUid: (data: { email: string; uid: string }) => void;
  googleSignIn: () => Promise<boolean>;
  tempEmailForGoogle: string | null;
  googleSignUp: (
    nickname: string,
    phoneNumber: string,
    paymentPassword: string,
  ) => Promise<boolean>;
  emailVerificationSentOn: number;
  smsVerificationSentOn: number;
  enteredEmailVerificationCode: string | null;
  enteredSmsVerificationCode: string | null;
  newPhoneNumber: string;
  setNewPhoneNumber: (phoneNo: string) => void;
  setEnteredEmailVerificationCode: (code: string) => void;
  setEnteredSmsVerificationCode: (code: string) => void;
  setEmailVerificationSentOn: (time: number) => void;
  setSmsVerificationSentOn: (time: number) => void;
  sendPhoneNoResetEmail: () => void;
  sendCodeOnOldEmail: () => void;
  sendCodeOnNewEmail: () => void;
  sendPhoneNoResetSMS: () => void;
  sendPaymentPWDResetEmail: () => void;
  sendPaymentPWDResetSMS: () => void;
  verifyCodesForPaymentPWDReset: (emailCode: string, smsCode: string) => void;
  createNewPaymentPassword: (password: string, confirmPassword: string) => void;
  updateUserPoints: (points: number) => void;
  resendEmailVerificationCode: () => Promise<boolean>;
  verifyEmailCodeForAccountActivation: (code: string) => Promise<boolean>;
  updateUserName: ({
    username,
    uuid,
  }: {
    username: string;
    uuid: string;
  }) => Promise<boolean>;

  resetEmail: (email: string) => Promise<boolean>;
  resetEmailVerify: (data: {
    oldCode: string;
    newCode: string;
  }) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set) => ({
  isGeneralRegisterOpen: false,
  isGoogleRegisterOpen: false,
  isForgetPassword1Open: false,
  isForgetPassword2Open: false,
  isForgetPassword3Open: false,
  isLoginOpen: false,
  enteredEmail: "",
  codeSentOn: 0,
  isUpdateUserNameOpen: false,
  isUpdateUserEmail: false,
  // payment code related code below
  paymentCodeStep1Open: false,
  paymentCodeStep2Open: false,
  paymentCodeSentOn: 0,
  // end
  isUpdateUserPhoneNo: false,
  userEmailAndUid: null,
  eneteredVerificationCode: null,

  setUserEmailAndUid: (data: { email: string; uid: string }) =>
    set({ userEmailAndUid: data }),
  tempEmailForGoogle: null,
  setEnteredEmail: (email: string) => set({ enteredEmail: email }),
  setCodeSentOn: (time: number) => set({ codeSentOn: time }),

  openGeneralRegister: () => set({ isGeneralRegisterOpen: true }),
  openGoogleRegister: () => set({ isGoogleRegisterOpen: true }),
  openForgetPassword1: () =>
    set({
      isForgetPassword1Open: true,
      isForgetPassword2Open: false,
      isForgetPassword3Open: false,
    }),
  openForgetPassword2: () =>
    set({
      isForgetPassword2Open: true,
      isForgetPassword1Open: false,
      isForgetPassword3Open: false,
    }),
  openForgetPassword3: () =>
    set({
      isForgetPassword3Open: true,
      isForgetPassword1Open: false,
      isForgetPassword2Open: false,
    }),

  closeGeneralRegister: () => set({ isGeneralRegisterOpen: false }),
  closeGoogleRegister: () => {
    set({ isGoogleRegisterOpen: false });
    set({ tempEmailForGoogle: null });
  },
  closeForgetPassword1: () => set({ isForgetPassword1Open: false }),
  closeForgetPassword2: () => set({ isForgetPassword2Open: false }),
  closeForgetPassword3: () => set({ isForgetPassword3Open: false }),
  // payment code related code below
  openPaymentCodeStep1: () => set({ paymentCodeStep1Open: true }),
  openPaymentCodeStep2: () => set({ paymentCodeStep2Open: true }),
  closePaymentCodeStep1: () => set({ paymentCodeStep1Open: false }),
  closePaymentCodeStep2: () => set({ paymentCodeStep2Open: false }),
  setPaymentCodeSentOn: (time: number) => set({ paymentCodeSentOn: time }),
  newPhoneNumber: "",
  setNewPhoneNumber: (phoneNo: string) => set({ newPhoneNumber: phoneNo }),
  user: null,
  setUser: (data: LoginOutputType["userData"]) => set({ user: data }),

  register: async (data: RegisterInputType) => {
    const setIsLoading = useGlobalStore.getState().setIsLoading;
    const showNotification = useGlobalStore.getState().showNotification;
    try {
      setIsLoading(true);
      // set entered email in state
      set({ enteredEmail: data.email });
      await Register(data);
      setIsLoading(false);
      showNotification("success", "Successfully registered");
      // open email verification modal
      useAuthStore.getState().openEmailVerificationModal();
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      showNotification("error", err?.response?.data);
    }
  },

  login: async (data: { emailorPhone: string; password: string }) => {
    const setIsLoading = useGlobalStore.getState().setIsLoading;
    const showNotification = useGlobalStore.getState().showNotification;
    try {
      setIsLoading(true);
      set({ enteredEmail: data.emailorPhone });
      const user = await Login(data);
      console.log("user data is:  " + user);
      set({ userEmailAndUid: { email: user.userEmail, uid: user?.userID } });

      localStorage.setItem(
        "user",
        JSON.stringify({
          email: user.userEmail,
          uid: user?.userID,
        }),
      );

      setIsLoading(false);
      showNotification("success", "Login Successful");
      return true;
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      showNotification("error", err?.response?.data);
      if (err?.response?.data === "Need to verify account first.") {
        useAuthStore.getState().openEmailVerificationModal();
        return false;
      }
      return false;
    }
  },

  forgotEmailPassword: async (data: string) => {
    const setIsLoading = useGlobalStore.getState().setIsLoading;
    const showNotification = useGlobalStore.getState().showNotification;

    try {
      setIsLoading(true);
      await ForgotEmailPassword({ email: data });
      setIsLoading(false);
      showNotification("success", "Email sent! Please check your email.");
      return true;
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      showNotification("error", "Error in sending Email");
      return false;
    }
  },

  emailPasswordVerify: async (code) => {
    const setIsLoading = useGlobalStore.getState().setIsLoading;
    const showNotification = useGlobalStore.getState().showNotification;
    try {
      setIsLoading(true);
      // get user data from firestore and get uuid
      const enteredEmail = useAuthStore.getState().enteredEmail;

      await EmailPasswordVerify({
        verification_code: code,
        email: enteredEmail,
      });

      // set code in state
      set({ eneteredVerificationCode: code });

      setIsLoading(false);
      showNotification("success", "code verified successfully");
      return true;
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      showNotification("error", "wrong code entered");
      return false;
    }
  },

  resetPassword: async (password, confirmPassword) => {
    const setIsLoading = useGlobalStore.getState().setIsLoading;
    const showNotification = useGlobalStore.getState().showNotification;
    const enteredEmail = useAuthStore.getState().enteredEmail;
    try {
      setIsLoading(true);

      const data = {
        email: enteredEmail,
        newpassword1: password,
        newpassword2: confirmPassword,
        verification_code: useAuthStore.getState().eneteredVerificationCode,
      };

      await ResetPassword(data);
      setIsLoading(false);
      showNotification("success", "Password updated successfully");
      return true;
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      showNotification("error", "Error updating password");
      return false;
    }
  },

  googleSignIn: async () => {
    const showNotification = useGlobalStore.getState().showNotification;
    const setIsLoading = useGlobalStore.getState().setIsLoading;
    try {
      setIsLoading(true);
      const provider = new GoogleAuthProvider();
      const authDetails = await signInWithPopup(auth, provider);
      const user = authDetails.user;
      // query user from firestore to see if user exist
      // if not, then open google register

      let userData = null;
      try {
        userData = await googleLoginByEmail(user?.email);
      } catch (err) {
        console.log("errorresponse", err?.response?.data);
        if (err?.response?.data === "User not found") {
          set({
            tempEmailForGoogle: user?.email,
          });
          useAuthStore.getState().openGoogleRegister();
          setIsLoading(false);
          return false;
        }
      }

      set({ userEmailAndUid: { email: user.email, uid: userData?.UUID } });
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: user.email,
          uid: userData?.UUID,
        }),
      );
      setIsLoading(false);
      showNotification("success", "Login Successful");
      return true;
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      showNotification("error", "Login Error");
      return false;
    }
  },

  googleSignUp: async (nickname, phoneNumber, paymentPassword) => {
    const showNotification = useGlobalStore.getState().showNotification;
    const setIsLoading = useGlobalStore.getState().setIsLoading;
    try {
      setIsLoading(true);
      const userEmail = useAuthStore.getState().tempEmailForGoogle;
      if (!userEmail) {
        setIsLoading(false);
        showNotification("error", "Error signing up");
        // close google register
        useAuthStore.getState().closeGoogleRegister();
        return false;
      }

      const data = {
        email: userEmail,
        paymentPassword: paymentPassword,
        username: nickname,
        phonenumber: phoneNumber,
      };

      // save user

      const res = await googleSignupByEmail(data);

      // set email and uid in global state
      set({ userEmailAndUid: { email: userEmail, uid: res?.uuid } });

      localStorage.setItem(
        "user",
        JSON.stringify({
          email: userEmail,
          uid: res?.uuid,
        }),
      );

      // close google register
      useAuthStore.getState().closeGoogleRegister();

      setIsLoading(false);
      showNotification("success", "Successfully registered");
      return true;
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      showNotification("error", "Error registering");
      return false;
    }
  },
  isLanguageModalOpen: false,
  openLanguageModal: () => set({ isLanguageModalOpen: true }),
  closeLanguageModal: () => set({ isLanguageModalOpen: false }),
  emailVerificationSentOn: 0,
  smsVerificationSentOn: 0,
  enteredEmailVerificationCode: null,
  enteredSmsVerificationCode: null,
  setEnteredEmailVerificationCode: (code: string) =>
    set({ enteredEmailVerificationCode: code }),
  setEnteredSmsVerificationCode: (code: string) =>
    set({ enteredSmsVerificationCode: code }),
  setEmailVerificationSentOn: (time: number) =>
    set({ emailVerificationSentOn: time }),
  setSmsVerificationSentOn: (time: number) =>
    set({ smsVerificationSentOn: time }),

  sendPaymentPWDResetEmail: async () => {
    const showNotification = useGlobalStore.getState().showNotification;
    const setIsLoading = useGlobalStore.getState().setIsLoading;

    try {
      setIsLoading(true);

      const { email, uid } = useAuthStore.getState().userEmailAndUid;
      await sendEmailCodeForPaymentPasswordReset(email, uid);
      set({ emailVerificationSentOn: Date.now() });
      setIsLoading(false);
      showNotification("success", "Email sent! Please check your email.");
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      showNotification("error", "Error in sending Email");
    }
  },
  sendPaymentPWDResetSMS: async () => {
    const showNotification = useGlobalStore.getState().showNotification;
    const setIsLoading = useGlobalStore.getState().setIsLoading;
    try {
      setIsLoading(true);
      const { uid } = useAuthStore.getState().userEmailAndUid;
      await sendSmsCodeForPaymentPasswordReset(uid);
      set({ smsVerificationSentOn: Date.now() });
      setIsLoading(false);
      showNotification("success", "SMS sent! Please check your phone.");
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      showNotification("error", "Error in sending SMS");
    }
  },
  sendPhoneNoResetEmail: async () => {
    const showNotification = useGlobalStore.getState().showNotification;
    const setIsLoading = useGlobalStore.getState().setIsLoading;
    try {
      setIsLoading(true);
      const { uid } = useAuthStore.getState().userEmailAndUid;
      await phoneNoEmailVerify({ uuid: uid });
      set({ emailVerificationSentOn: Date.now() });
      setIsLoading(false);
      showNotification("success", "Email sent! Please check your email.");
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      showNotification("error", "Error in sending Email");
    }
  },
  sendPhoneNoResetSMS: async () => {
    const showNotification = useGlobalStore.getState().showNotification;
    const setIsLoading = useGlobalStore.getState().setIsLoading;
    const newPhoneNo = useAuthStore.getState().newPhoneNumber;
    try {
      setIsLoading(true);
      const { uid } = useAuthStore.getState().userEmailAndUid;
      await phoneNoSmsVerify({
        newphonenumber: newPhoneNo, //useAuthStore.getState().newPhoneNumber,
        uuid: uid,
      });
      set({ smsVerificationSentOn: Date.now() });
      setIsLoading(false);
      showNotification("success", "SMS sent! Please check your phone.");
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      showNotification("error", "Error in sending SMS");
    }
  },
  verifyCodesForPaymentPWDReset: async (emailCode, smsCode) => {
    const showNotification = useGlobalStore.getState().showNotification;
    const setIsLoading = useGlobalStore.getState().setIsLoading;
    try {
      setIsLoading(true);
      //  set entered codes in state
      set({ enteredEmailVerificationCode: emailCode });
      set({ enteredSmsVerificationCode: smsCode });
      const uuid = useAuthStore.getState().userEmailAndUid.uid;

      // verify email code

      try {
        await verifyEmailCodeForPaymentPasswordReset(emailCode, uuid);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        showNotification("error", "Wrong email code entered");
        return;
      }
      try {
        await verifySmsCodeForPaymentPasswordReset(smsCode, uuid);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        showNotification("error", "Wrong sms code entered");
        return;
      }
      setIsLoading(false);
      showNotification("success", "Codes verified successfully");

      // close payment code step 1

      console.log("codes verified successfully");
      useAuthStore.getState().closePaymentCodeStep1();

      // open payment code step 2
      useAuthStore.getState().openPaymentCodeStep2();
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      showNotification("error", "Wrong codes entered");
    }
  },
  createNewPaymentPassword: async (password, confirmPassword) => {
    const showNotification = useGlobalStore.getState().showNotification;
    const setIsLoading = useGlobalStore.getState().setIsLoading;
    const dataToSend = {
      uuid: useAuthStore.getState().userEmailAndUid.uid,
      newpaymentpassword1: password,
      newpaymentpassword2: confirmPassword,
      email_verification_code:
        useAuthStore.getState().enteredEmailVerificationCode,
      phone_verification_code:
        useAuthStore.getState().enteredSmsVerificationCode,
    };
    try {
      setIsLoading(true);
      await createNewPaymentPassword(dataToSend);
      setIsLoading(false);
      showNotification("success", "Password updated successfully");
      // close payment code step 2
      useAuthStore.getState().closePaymentCodeStep2();
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      showNotification("error", "Error updating password");
    }
  },
  updateUserPoints: (points) => {
    const user = useAuthStore.getState().user;
    if (user) {
      set({ user: { ...user, Points: points.toString() } });
    }
  },
  isEmailVerificationModalOpen: false,
  openEmailVerificationModal: () => set({ isEmailVerificationModalOpen: true }),
  closeEmailVerificationModal: () =>
    set({ isEmailVerificationModalOpen: false }),

  resendEmailVerificationCode: async () => {
    const showNotification = useGlobalStore.getState().showNotification;
    const setIsLoading = useGlobalStore.getState().setIsLoading;
    try {
      setIsLoading(true);
      const email = useAuthStore.getState().enteredEmail;
      await resendEmailVerificationCode(email);
      setIsLoading(false);
      showNotification("success", "Email sent! Please check your email.");
      return true;
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      showNotification("error", "Error in sending Email");
      return false;
    }
  },
  verifyEmailCodeForAccountActivation: async (code) => {
    const showNotification = useGlobalStore.getState().showNotification;
    const setIsLoading = useGlobalStore.getState().setIsLoading;
    try {
      setIsLoading(true);
      const email = useAuthStore.getState().enteredEmail;
      await verifyEmailCode({ email, verification_code: code });
      setIsLoading(false);
      showNotification("success", "code verified successfully");
      // close email verification modal
      useAuthStore.getState().closeEmailVerificationModal();
      return true;
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      showNotification("error", "wrong code entered");
      return false;
    }
  },
  openUpdateUserName: () => set({ isUpdateUserNameOpen: true }),

  closeUpdateUserName: () => set({ isUpdateUserNameOpen: false }),

  updateUserName: async ({ username, uuid }) => {
    const showNotification = useGlobalStore.getState().showNotification;
    const setIsLoading = useGlobalStore.getState().setIsLoading;
    try {
      setIsLoading(true);
      await resetUserName({ username, uuid });
      setIsLoading(false);
      showNotification("success", "Username updated successfully");
      useAuthStore.getState().closeUpdateUserName();
      set({ user: { ...useAuthStore.getState().user, UserName: username } });
      return true;
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      showNotification("error", "Error updating username");
      return false;
    }
  },

  openUpdateUserEmail: () => set({ isUpdateUserEmail: true }),
  closeUpdateUserEmail: () => set({ isUpdateUserEmail: false }),
  openUpdateUserPhoneNo: () => set({ isUpdateUserPhoneNo: true }),
  closeUpdateUserPhoneNo: () => set({ isUpdateUserPhoneNo: false }),
  resetPhoneNo: async () => {
    const showNotification = useGlobalStore.getState().showNotification;
    const setIsLoading = useGlobalStore.getState().setIsLoading;
    try {
      setIsLoading(true);
      const newPhoneNumber = useAuthStore.getState().newPhoneNumber;
      const res = await resetUserPhoneNo({
        uuid: useAuthStore.getState().userEmailAndUid.uid,
        phonenumber: newPhoneNumber,
        email_verification_code:
          useAuthStore.getState().enteredEmailVerificationCode,
        phone_verification_code:
          useAuthStore.getState().enteredSmsVerificationCode,
      });
      console.log("res", res);
      setIsLoading(false);
      showNotification("success", "New Phone Number saved successfully");
      set({
        user: {
          ...useAuthStore.getState().user,
          Phonenumber: newPhoneNumber,
        },
      });
      await useAuthStore.getState().closeUpdateUserPhoneNo();
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      showNotification("error", err?.response.data.message);
      await useAuthStore.getState().closeUpdateUserPhoneNo();
    }
  },
  resetEmail: async (newEmail) => {
    const showNotification = useGlobalStore.getState().showNotification;
    const setIsLoading = useGlobalStore.getState().setIsLoading;
    try {
      setIsLoading(true);
      const { uid, email } = useAuthStore.getState().userEmailAndUid;

      if (newEmail === email) {
        setIsLoading(false);
        showNotification("error", "New Email is already in use");
        return false;
      } else {
        await verifyOldEmail({ uuid: uid });
        await resetUserEmail({ newEmail: newEmail, uuid: uid });
        // set entered email and code sent on in state
        set({ enteredEmail: newEmail });
        set({ codeSentOn: Date.now() });
        set({ emailVerificationSentOn: Date.now() });
        setIsLoading(false);
        useAuthStore.getState().closeUpdateUserEmail();
        useAuthStore.getState().openUpdateEmailVerify();
        showNotification(
          "success",
          "Check your new entered email and current email for verification code",
        );

        //no need to set state here because the user has not verified code from new email yet
        return true;
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      showNotification("error", err?.response?.data.message);
      return false;
    }
  },
  isUpdateEmailVerifyOpen: false,
  openUpdateEmailVerify: () => set({ isUpdateEmailVerifyOpen: true }),
  closeUpdateEmailVerify: () => set({ isUpdateEmailVerifyOpen: false }),
  resetEmailVerify: async (data: { oldCode: string; newCode: string }) => {
    const uid = useAuthStore.getState().userEmailAndUid.uid;
    const showNotification = useGlobalStore.getState().showNotification;
    const setIsLoading = useGlobalStore.getState().setIsLoading;
    try {
      setIsLoading(true);
      const res = await verifyResetUserEmail({
        newEmail: useAuthStore.getState().enteredEmail,
        verification_code: data.oldCode,
        new_verification_code: data.newCode,
        uuid: useAuthStore.getState().userEmailAndUid.uid,
      });
      console.log("response is here:", res);
      const newEmail = res?.userEmail;
      // set email in state
      set({ user: { ...useAuthStore.getState().user, Email: newEmail } });
      set({ userEmailAndUid: { email: newEmail, uid: uid } });
      setIsLoading(false);
      showNotification("success", "Email updated , please Login!");
      useAuthStore.getState().closeUpdateEmailVerify();
      useAuthStore.getState().closeUpdateUserEmail();
      return true;
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      showNotification("error", err?.response?.data.message);
      return false;
    }
  },
  sendCodeOnOldEmail: async () => {
    const showNotification = useGlobalStore.getState().showNotification;
    const setIsLoading = useGlobalStore.getState().setIsLoading;
    try {
      setIsLoading(true);
      const { uid } = useAuthStore.getState().userEmailAndUid;
      await verifyOldEmail({ uuid: uid });
      set({ emailVerificationSentOn: Date.now() });
      setIsLoading(false);
      showNotification(
        "success",
        "Check your current email for verification code",
      );
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      showNotification("error", err?.response?.data.message);
    }
  },
  sendCodeOnNewEmail: async () => {
    const showNotification = useGlobalStore.getState().showNotification;
    const setIsLoading = useGlobalStore.getState().setIsLoading;
    try {
      setIsLoading(true);
      const uid = useAuthStore.getState().userEmailAndUid.uid;
      const email = useAuthStore.getState().enteredEmail;
      await resetUserEmail({ newEmail: email, uuid: uid });
      set({ codeSentOn: Date.now() });
      setIsLoading(false);
      showNotification(
        "success",
        "Check your new entered email for verification code",
      );
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      showNotification("error", err?.response?.data.message);
    }
  },
}));
