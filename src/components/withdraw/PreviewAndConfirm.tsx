import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Drawer } from "@mui/material";
import { useHomeStore } from "store/homeStore";
import * as yup from "yup";

import { CustomButton, InputWithLabel } from "components/generic";

interface PreviewAndConfirmIProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (res: boolean) => void;
  amount: number;
  walletAddress: string;
  network: string;
}
const Schema = yup
  .object({
    mobileConfirmCode: yup
      .string()
      .required()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(6, "Must be exactly 10 digits")
      .max(6, "Must be exactly 10 digits"),
    emailConfirmCode: yup
      .string()
      .required()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(6, "Must be exactly 10 digits")
      .max(6, "Must be exactly 10 digits"),
  })
  .required();

export type PreviewAndConfirmFormValues = yup.InferType<typeof Schema>;

const PreviewAndConfirm = ({
  isOpen,
  onClose,
  onConfirm,
  amount,
  walletAddress,
  network,
}: PreviewAndConfirmIProps) => {
  const { t } = useTranslation();
  const [emailVerificationCodeSentOn, setEmailVerificationCodeSentOn] =
    useState<number>(0);
  const [mobileVerificationCodeSentOn, setMobileVerificationCodeSentOn] =
    useState<number>(0);
  const [timeRemainingTillSmsResend, setTimeRemainingTillSmsResend] =
    useState<number>(0);
  const [timeRemainingTillEmailResend, setTimeRemainingTillEmailResend] =
    useState<number>(0);

  const sendWithdrawEmail = useHomeStore((state) => state.sendWithdrawEmail);
  const sendWithdrawSMS = useHomeStore((state) => state.sendWithdrawSMS);
  const processWithdraw = useHomeStore((state) => state.processWithdraw);

  const sendEmailVerificationCode = async () => {
    const res = await sendWithdrawEmail();
    if (!res) return;
    setEmailVerificationCodeSentOn(Date.now() + 60000);
    setTimeRemainingTillEmailResend(60000);
  };
  const sendMobileVerificationCode = async () => {
    const res = await sendWithdrawSMS();
    if (!res) return;
    setMobileVerificationCodeSentOn(Date.now() + 60000);
    setTimeRemainingTillSmsResend(60000);
  };

  useEffect(() => {
    if (emailVerificationCodeSentOn) {
      const interval = setInterval(() => {
        const timeRemaining = emailVerificationCodeSentOn - Date.now();
        if (timeRemaining <= 0) {
          clearInterval(interval);
          setTimeRemainingTillEmailResend(0);
        } else {
          setTimeRemainingTillEmailResend(timeRemaining);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [emailVerificationCodeSentOn]);

  useEffect(() => {
    if (mobileVerificationCodeSentOn) {
      const interval = setInterval(() => {
        const timeRemaining = mobileVerificationCodeSentOn - Date.now();
        if (timeRemaining <= 0) {
          clearInterval(interval);
          setTimeRemainingTillSmsResend(0);
        } else {
          setTimeRemainingTillSmsResend(timeRemaining);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [mobileVerificationCodeSentOn]);

  // send code when page loads
  useEffect(() => {
    if (!isOpen) return;
    sendEmailVerificationCode();
    sendMobileVerificationCode();
  }, [isOpen]);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<PreviewAndConfirmFormValues>({ resolver: yupResolver(Schema) });

  const withdrawHandler = async () => {
    const { emailConfirmCode, mobileConfirmCode } = getValues();
    const res = await processWithdraw({
      emailCode: emailConfirmCode,
      smsCode: mobileConfirmCode,
    });
    if (!res) onConfirm(false);
    else onConfirm(true);
  };

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      sx={{
        maxHeight: "75vh",
      }}
      anchor={"bottom"}
      PaperProps={{
        sx: {
          borderRadius: "20px 20px 0 0",
        },
      }}
    >
      <Box
        sx={{
          width: "100vw",
          display: "flex",
          flexDirection: "column",
        }}
        role="presentation"
      >
        <div className="mt-2 mb-2.5 w-32 h-1 mx-auto rounded-[10px] bg-Neutral-n700"></div>

        <h4 className="mb-4 text-midnight-blue font-poppins text-2xl font-bold leading-8 tracking-[-0.15px] text-center">
          {t("withdrawal-confirmation")}
        </h4>
        <div className="px-5 flex flex-col gap-3">
          <div className="flex justify-between">
            <p className="font-poppins text-sm tracking-[0.14px] text-Neutral-n400">
              {t("network")}
            </p>
            <p className="font-poppins text-sm font-medium text-Neutral-n700">
              {network}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="font-poppins text-sm tracking-[0.14px] text-Neutral-n400">
              {t("currency")}
            </p>
            <p className="font-poppins text-sm font-medium text-Neutral-n700">
              USDT
            </p>
          </div>

          <div className="flex justify-between gap-1">
            <p className="font-poppins text-sm tracking-[0.14px] text-Neutral-n400">
              {t("address")}
            </p>
            <p
              className="font-poppins text-sm font-medium text-Neutral-n700 text-right break-all"
              style={{ lineBreak: "anywhere" }}
            >
              {walletAddress?.slice(0, walletAddress?.length - 20)}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="font-poppins text-sm tracking-[0.14px] text-Neutral-n400">
              {t("withdrawal-quantity")}
            </p>
            <p className="font-poppins text-sm font-medium text-Neutral-n700">
              $ {amount}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="font-poppins text-sm tracking-[0.14px] text-Neutral-n400">
              {t("network-fee")}
            </p>
            <p className="font-poppins text-sm font-medium text-Neutral-n700">
              $ 1
            </p>
          </div>
          <div className="flex justify-between">
            <p className="font-poppins text-sm tracking-[0.14px] text-Neutral-n400">
              {t("account-received")}
            </p>
            <p className="font-poppins text-sm font-medium text-Neutral-n700">
              $ {amount - 1}
            </p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(withdrawHandler)}
          className="mt-5 px-5 pb-20"
        >
          <InputWithLabel
            label={t("email-verification")}
            placeholder={t("enter-email-verification-code")}
            id="emailConfirmCode"
            type="text"
            register={register}
            errors={errors}
            labelClassName="text-Neutral-n700"
            endIcon={
              timeRemainingTillEmailResend > 0 ? (
                <p className="text-dark-sky-blue opacity-40 font-poppins text-sm font-medium leading-5.5 tracking-[0.14px] gap-2 flex">
                  重新發送 {Math.trunc(timeRemainingTillEmailResend / 1000)}秒
                </p>
              ) : (
                <button
                  className="bg-Shade-White pl-2 font-poppins text-sm font-semibold leading-5.5 tracking-[0.14px] text-dark-sky-blue"
                  type="button"
                  onClick={sendEmailVerificationCode}
                >
                  {t("resend")}
                </button>
              )
            }
          />
          <InputWithLabel
            label={t("phone-verification")}
            placeholder={t("enter-phone-verification-code")}
            id="mobileConfirmCode"
            type="text"
            register={register}
            errors={errors}
            endIcon={
              timeRemainingTillSmsResend > 0 ? (
                <p className="text-dark-sky-blue opacity-40 font-poppins text-sm font-medium leading-5.5 tracking-[0.14px] gap-2 flex">
                  重新發送 {Math.trunc(timeRemainingTillSmsResend / 1000)}秒
                </p>
              ) : (
                <button
                  className="bg-Shade-White pl-2 font-poppins text-sm font-semibold leading-5.5 tracking-[0.14px] text-dark-sky-blue"
                  type="button"
                  onClick={sendMobileVerificationCode}
                >
                  {t("resend")}
                </button>
              )
            }
          />
          <CustomButton
            className="mt-6 !text-2xl !font-semibold !h-[60px] !rounded-[20px] tracking-[0.14px]"
            text={t("completed")}
            type="submit"
          />
        </form>
      </Box>
    </Drawer>
  );
};

export default PreviewAndConfirm;
