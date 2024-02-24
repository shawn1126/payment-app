import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import { t } from "i18next";
import { useAuthStore } from "store/authStore";
import * as yup from "yup";

import {
  CustomButton,
  CustomTopbar,
  InputWithLabel,
  SidebarPageWrapper,
} from "components/generic";

const Schema = yup
  .object({
    code: yup.string().required(t("please-enter-the-verification-code")),
  })
  .required();

export type ForgotAccPassword2FormValues = yup.InferType<typeof Schema>;

const ForgotAccPassword2 = ({ open }: { open: boolean }) => {
  const { t } = useTranslation();

  const enteredEmail = useAuthStore((state) => state.enteredEmail);
  const codeSentOn = useAuthStore((state) => state.codeSentOn);
  const openForgetPassword1 = useAuthStore(
    (state) => state.openForgetPassword1,
  );
  const openForgetPassword3 = useAuthStore(
    (state) => state.openForgetPassword3,
  );
  const closeForgetPassword2 = useAuthStore(
    (state) => state.closeForgetPassword2,
  );
  const setCodeSentOn = useAuthStore((state) => state.setCodeSentOn);

  const emailPasswordVerifyApi = useAuthStore(
    (state) => state.emailPasswordVerify,
  );

  const ForgetPasswordApi = useAuthStore((state) => state.forgotEmailPassword);

  //   resend is available after 1 minute
  const [secondsUntilResend, setSecondsUntilResend] = useState(60);
  const [isResendAvailable, setIsResendAvailable] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotAccPassword2FormValues>({ resolver: yupResolver(Schema) });

  const onSubmit = async (data: ForgotAccPassword2FormValues) => {
    try {
      const res = await emailPasswordVerifyApi(data.code);
      if (res) openForgetPassword3();
    } catch (error) {
      const err = error as Error;
      console.error(err);
    }
  };

  const resendCodeHandler = async () => {
    //  resend code here
    if (!isResendAvailable) return;

    const res = await ForgetPasswordApi(enteredEmail);
    if (res) {
      setCodeSentOn(new Date().getTime());
      setIsResendAvailable(false);
    }
  };

  useEffect(() => {
    // take the difference between the current time and codeSentOn
    // if the difference is greater than 1 minute, resend is available
    const interval = setInterval(() => {
      const diff = Math.floor((Date.now() - codeSentOn) / 1000);
      if (diff > 60) {
        setSecondsUntilResend(0);
        setIsResendAvailable(true);
      } else {
        setSecondsUntilResend(60 - diff);
        setIsResendAvailable(false);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [codeSentOn]);

  return (
    <SidebarPageWrapper isOpen={open} onClose={closeForgetPassword2}>
      <CustomTopbar
        leftIconOnClick={() => {
          closeForgetPassword2();
          openForgetPassword1();
        }}
      />
      <div className="px-5 flex-1 flex flex-col">
        <h3 className="mb-3 text-Neutral-n800 text-center font-poppins text-3xl font-bold leading-8.5 tracking-[-0.15px]">
          {t("account-verification")}
        </h3>
        <p className="text-Neutral-n600 text-center font-poppins text-sm leading-5.5 tracking-[0.14px]">
          {t("code-sent-to-helloerci@gmail.com")}
          <span className="font-bold">{enteredEmail}</span>
        </p>
        <p className="text-Neutral-n600 text-center font-poppins text-sm leading-5.5 tracking-[0.14px] mb-8">
          {t("enter-verification-code-to-reset-password")}
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 flex flex-col justify-between"
        >
          <div className="flex flex-col justify-between">
            <InputWithLabel<ForgotAccPassword2FormValues>
              id="code"
              label={t("verification-cod")}
              placeholder={t("please-enter-the-verification-code")}
              type="text"
              register={register}
              errors={errors}
            />
          </div>
          <div>
            <div className="flex justify-center">
              <p className="text-Neutral-n600 font-poppinstext-sm leading-5.5tracking-[0.14px]">
                {t("no-verification-code-received?")}
              </p>
              <p
                className={classNames(
                  "text-light-sky-blue font-poppinstext-sm leading-5.5tracking-[0.14px]",
                  {
                    "opacity-50 cursor-not-allowed": !isResendAvailable,
                    "opacity-100 cursor-pointer": isResendAvailable,
                  },
                )}
                onClick={resendCodeHandler}
              >
                &nbsp;{t("resend")}
              </p>
            </div>
            <p className="text-Neutral-n600 font-poppinstext-sm leading-5.5tracking-[0.14px] text-center mt-2">
              {t("resend-verification-code")}
              {secondsUntilResend > 0 && (
                <span className="ml-0.5">
                  {Math.floor(secondsUntilResend / 60)}:
                  {secondsUntilResend % 60}
                </span>
              )}
            </p>
          </div>
          <div>
            <CustomButton
              text={t("account-verification")}
              type="submit"
              isDisabled={Object.keys(errors).length > 0}
              className="mb-14"
            />
          </div>
        </form>
      </div>
    </SidebarPageWrapper>
  );
};

export default ForgotAccPassword2;
