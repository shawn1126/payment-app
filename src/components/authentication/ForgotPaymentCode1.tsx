import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
// import { t } from "i18next";
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
    emailCode: yup
      .string()
      .required("請至少輸入 6 位數字密碼")
      .min(6, "請至少輸入 6 位數字密碼"),
    smsCode: yup
      .string()
      .required("請至少輸入 6 位數字密碼")
      .min(6, "請至少輸入 6 位數字密碼"),
  })
  .required();

export type ForgotPaymentCode1FormValues = yup.InferType<typeof Schema>;

const ForgotPaymentCode1 = ({ open }: { open: boolean }) => {
  const { t } = useTranslation();

  const closePaymentCodeStep1 = useAuthStore(
    (state) => state.closePaymentCodeStep1,
  );

  const emailVerificationSentOn = useAuthStore(
    (state) => state.emailVerificationSentOn,
  );
  const smsVerificationSentOn = useAuthStore(
    (state) => state.smsVerificationSentOn,
  );

  const [timeRemainingToSendEmailAgain, setTimeRemainingToSendEmailAgain] =
    useState(0);
  const [timeRemainingToSendSmsAgain, setTimeRemainingToSendSmsAgain] =
    useState(0);

  const sendPaymentPWDResetEmail = useAuthStore(
    (state) => state.sendPaymentPWDResetEmail,
  );
  const sendPaymentPWDResetSMS = useAuthStore(
    (state) => state.sendPaymentPWDResetSMS,
  );
  const verifyCodesForPaymentPWDReset = useAuthStore(
    (state) => state.verifyCodesForPaymentPWDReset,
  );

  // we can send again after 60 seconds of the last sent which is stored in emailVerificationSentOn as Date.now()
  // calculate every 1 second if difference between Date.now() and emailVerificationSentOn is less than 60 seconds

  useEffect(() => {
    if (emailVerificationSentOn) {
      const interval = setInterval(() => {
        const difference = Date.now() - emailVerificationSentOn;
        if (difference < 60000) {
          setTimeRemainingToSendEmailAgain(
            Math.floor((60000 - difference) / 1000),
          );
        } else {
          setTimeRemainingToSendEmailAgain(0);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [emailVerificationSentOn]);

  useEffect(() => {
    if (smsVerificationSentOn) {
      const interval = setInterval(() => {
        const difference = Date.now() - smsVerificationSentOn;
        if (difference < 60000) {
          setTimeRemainingToSendSmsAgain(
            Math.floor((60000 - difference) / 1000),
          );
        } else {
          setTimeRemainingToSendSmsAgain(0);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [smsVerificationSentOn]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPaymentCode1FormValues>({ resolver: yupResolver(Schema) });

  const onSubmit = (data: ForgotPaymentCode1FormValues) => {
    console.log(data);
    //  do api call here
    verifyCodesForPaymentPWDReset(data.emailCode, data.smsCode);
  };

  const resendEmailHandler = () => {
    if (timeRemainingToSendEmailAgain > 0) return;
    console.log("resend email");
    sendPaymentPWDResetEmail();
  };

  const resendSmsHandler = () => {
    if (timeRemainingToSendSmsAgain > 0) return;
    console.log("resend sms");
    sendPaymentPWDResetSMS();
  };

  return (
    <SidebarPageWrapper isOpen={open} onClose={closePaymentCodeStep1}>
      <CustomTopbar leftIconOnClick={closePaymentCodeStep1} />
      <div className="px-5 flex-1 flex flex-col">
        <h3 className="mb-3 text-Neutral-n800 text-center font-poppins text-3xl font-bold leading-8.5 tracking-[-0.15px]">
          {t("forgot-payment-password")}
        </h3>
        <p className="mb-8 text-Neutral-n600 text-center font-poppins text-sm leading-5.5 tracking-[0.14px]">
          {t("no-worries!-Enter-email-and-phone-for-code-to-set-password")}
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 flex flex-col justify-between"
        >
          <div className="flex flex-col justify-between">
            <InputWithLabel<ForgotPaymentCode1FormValues>
              id="emailCode"
              label={t("email-verification")}
              placeholder={t("enter-email-verification-code")}
              componentClassName="mb-8"
              type="text"
              register={register}
              errors={errors}
              endIcon={
                <p
                  className={classNames(
                    "font-poppins text-sm font-semibold leading-5.5 text-dark-sky-blue",
                    {
                      "opacity-50": timeRemainingToSendEmailAgain > 0,
                    },
                  )}
                  onClick={resendEmailHandler}
                >
                  {timeRemainingToSendEmailAgain === 0
                    ? "發送"
                    : `重新發送 ${timeRemainingToSendEmailAgain}秒`}
                </p>
              }
            />

            <InputWithLabel<ForgotPaymentCode1FormValues>
              id="smsCode"
              label={t("2FA-authentication")}
              placeholder={t("enter-phone-verification-code")}
              type="text"
              register={register}
              errors={errors}
              endIcon={
                <p
                  className={classNames(
                    "font-poppins text-sm font-semibold leading-5.5 text-dark-sky-blue",
                    {
                      "opacity-50": timeRemainingToSendSmsAgain > 0,
                    },
                  )}
                  onClick={resendSmsHandler}
                >
                  {timeRemainingToSendSmsAgain === 0
                    ? "發送"
                    : `重新發送 ${timeRemainingToSendSmsAgain}秒`}
                </p>
              }
            />
          </div>
          <div>
            <CustomButton
              text={t("send-verification-code")}
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

export default ForgotPaymentCode1;
