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
    newPhoneNumber: yup
      .string()
      .required("手机号码为必填项")
      .min(10, "手機號碼格式錯誤")
      .max(10, "手機號碼格式錯誤"),
    emailCode: yup
      .string()
      .required("需要邮箱验证码")
      .min(6, "邮箱验证码错误")
      .max(6, "邮箱验证码错误"),
    smsCode: yup
      .string()
      .required("需要手机号码验证码")
      .min(6, "手機驗證碼錯誤")
      .max(6, "手機驗證碼錯誤"),
  })
  .required();

export type UpdateUserPhoneNoFormValues = yup.InferType<typeof Schema>;

const UpdateUserPhoneNo = ({ open }: { open: boolean }) => {
  const { t } = useTranslation();

  const closeUpdateUserPhoneNo = useAuthStore(
    (state) => state.closeUpdateUserPhoneNo,
  );

  const emailVerificationSentOn = useAuthStore(
    (state) => state.emailVerificationSentOn,
  );
  const smsVerificationSentOn = useAuthStore(
    (state) => state.smsVerificationSentOn,
  );
  const sendPhoneNoResetEmail = useAuthStore(
    (state) => state.sendPhoneNoResetEmail,
  );

  const [timeRemainingToSendEmailAgain, setTimeRemainingToSendEmailAgain] =
    useState(0);
  const [timeRemainingToSendSmsAgain, setTimeRemainingToSendSmsAgain] =
    useState(0);

  const resetPhoneNo = useAuthStore((state) => state.resetPhoneNo);
  const setEnteredEmailVerificationCode = useAuthStore(
    (state) => state.setEnteredEmailVerificationCode,
  );
  const setEnteredSmsVerificationCode = useAuthStore(
    (state) => state.setEnteredSmsVerificationCode,
  );
  const setNewPhoneNumber = useAuthStore((state) => state.setNewPhoneNumber);
  const sendPhoneNoResetSMS = useAuthStore(
    (state) => state.sendPhoneNoResetSMS,
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
    getValues,
    formState: { errors },
  } = useForm<UpdateUserPhoneNoFormValues>({ resolver: yupResolver(Schema) });

  const onSubmit = async (data: UpdateUserPhoneNoFormValues) => {
    setEnteredEmailVerificationCode(data.emailCode);
    setEnteredSmsVerificationCode(data.smsCode);
    setNewPhoneNumber(data.newPhoneNumber);
    await resetPhoneNo();
  };

  const resendEmailHandler = async () => {
    if (timeRemainingToSendEmailAgain > 0) return;
    await sendPhoneNoResetEmail();
  };

  const resendSmsHandler = async (value) => {
    setNewPhoneNumber(value);
    if (timeRemainingToSendSmsAgain > 0) return;
    await sendPhoneNoResetSMS();
  };

  return (
    <SidebarPageWrapper isOpen={open} onClose={closeUpdateUserPhoneNo}>
      <CustomTopbar leftIconOnClick={closeUpdateUserPhoneNo} />
      <div className="px-5 flex-1 flex flex-col">
        <h3 className="mb-8 text-Neutral-n800 text-center font-poppins text-3xl font-bold leading-8.5 tracking-[-0.15px]">
          {t("change-phone-number")}
        </h3>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 flex flex-col justify-between"
        >
          <div className="flex flex-col justify-between">
            <InputWithLabel<UpdateUserPhoneNoFormValues>
              id="newPhoneNumber"
              label={t("new-phone-number")}
              placeholder={t("enter-new-phone-number")}
              componentClassName="mb-8"
              type="number"
              register={register}
              errors={errors}
            />
            <InputWithLabel<UpdateUserPhoneNoFormValues>
              id="emailCode"
              label={t("email-verification")}
              placeholder={t("enter-email-verification-code")}
              componentClassName="mb-8"
              type="number"
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

            <InputWithLabel<UpdateUserPhoneNoFormValues>
              id="smsCode"
              label={t("sms-verification-code")}
              placeholder={t("enter-phone-verification-code")}
              type="number"
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
                  onClick={() => {
                    const value = getValues("newPhoneNumber");
                    resendSmsHandler(value);
                  }}
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
              text={t("save-new-phone-number")}
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

export default UpdateUserPhoneNo;
