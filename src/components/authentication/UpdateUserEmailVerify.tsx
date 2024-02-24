import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import { t } from "i18next";
import { useAuthStore } from "store/authStore";
import { maskEmail } from "utils/functions";
import * as yup from "yup";

import {
  CustomButton,
  CustomTopbar,
  InputWithLabel,
  SidebarPageWrapper,
} from "components/generic";

const Schema = yup
  .object({
    oldCode: yup.string().required(t("please-enter-the-verification-code")),
    newCode: yup.string().required(t("please-enter-the-verification-code")),
  })
  .required();

export type UpdateUserEmailVerifyFormValues = yup.InferType<typeof Schema>;

const UpdateUserEmailVerify = ({ open }: { open: boolean }) => {
  const { t } = useTranslation();
  const [
    timeRemainingToSendOldEmailAgain,
    setTimeRemainingToSendOldEmailAgain,
  ] = useState(0);
  const [
    timeRemainingToSendNewEmailAgain,
    setTimeRemainingToSendNewEmailAgain,
  ] = useState(0);

  const emailVerificationSentOn = useAuthStore(
    (state) => state.emailVerificationSentOn,
  );
  const setUser = useAuthStore((state) => state.setUser);
  const setUserEmailAndUid = useAuthStore((state) => state.setUserEmailAndUid);
  const sendCodeOnNewEmail = useAuthStore((state) => state.sendCodeOnNewEmail);
  const sendCodeOnOldEmail = useAuthStore((state) => state.sendCodeOnOldEmail);
  const codeSentOn = useAuthStore((state) => state.codeSentOn);
  useEffect(() => {
    if (emailVerificationSentOn) {
      const interval = setInterval(() => {
        const difference = Date.now() - emailVerificationSentOn; //for old email verification
        if (difference < 60000) {
          setTimeRemainingToSendOldEmailAgain(
            Math.floor((60000 - difference) / 1000),
          );
        } else {
          setTimeRemainingToSendOldEmailAgain(0);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [emailVerificationSentOn]);

  useEffect(() => {
    if (codeSentOn) {
      const interval = setInterval(() => {
        const difference = Date.now() - codeSentOn; //for new email verification code sent on
        if (difference < 60000) {
          setTimeRemainingToSendNewEmailAgain(
            Math.floor((60000 - difference) / 1000),
          );
        } else {
          setTimeRemainingToSendNewEmailAgain(0);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [codeSentOn]);
  const enteredEmail = useAuthStore((state) => state.enteredEmail);
  const email = useAuthStore((state) => state.userEmailAndUid.email);

  const closeUpdateEmailVerify = useAuthStore(
    (state) => state.closeUpdateEmailVerify,
  );

  const openUpdateUserEmail = useAuthStore(
    (state) => state.openUpdateUserEmail,
  );
  const resetEmailVerify = useAuthStore((state) => state.resetEmailVerify);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserEmailVerifyFormValues>({
    resolver: yupResolver(Schema),
  });

  const resendOldEmailHandler = async () => {
    if (timeRemainingToSendOldEmailAgain > 0) return;
    await sendCodeOnOldEmail();
  };

  const resendNewEmailHandler = async () => {
    if (timeRemainingToSendNewEmailAgain > 0) return;
    await sendCodeOnNewEmail();
  };
  const onSubmit = async (data: UpdateUserEmailVerifyFormValues) => {
    const res = await resetEmailVerify({
      oldCode: data.oldCode,
      newCode: data.newCode,
    });
    if (res) {
      localStorage.removeItem("user");
      setUser(null);
      setUserEmailAndUid(null);
    }
  };

  return (
    <SidebarPageWrapper isOpen={open} onClose={closeUpdateEmailVerify}>
      <CustomTopbar
        leftIconOnClick={() => {
          closeUpdateEmailVerify();
          openUpdateUserEmail();
        }}
      />
      <div className="px-5 flex-1 flex flex-col gap-8">
        <div>
          <h3 className="mb-3 text-Neutral-n800 text-center font-poppins text-3xl font-bold leading-8.5 tracking-[-0.15px]">
            {t("change-the-email")}
          </h3>
          <p className="text-Neutral-n600 text-center font-poppins text-sm leading-5.5 tracking-[0.14px]">
            {t("code-sent-to-helloerci@gmail.com")}
            <span className="font-bold">
              {maskEmail(enteredEmail)} and <br /> {maskEmail(email)}
            </span>
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 flex flex-col justify-between"
        >
          <div className="flex flex-col justify-between">
            <div>
              <InputWithLabel<UpdateUserEmailVerifyFormValues>
                id="oldCode"
                label={t("old-email-verification-code")}
                placeholder={t("please-enter-the-verification-code")}
                type="text"
                register={register}
                errors={errors}
                endIcon={
                  <p
                    className={classNames(
                      "font-poppins text-sm font-semibold leading-5.5 text-dark-sky-blue",
                      {
                        "opacity-50": timeRemainingToSendOldEmailAgain > 0,
                      },
                    )}
                    onClick={resendOldEmailHandler}
                  >
                    {timeRemainingToSendOldEmailAgain === 0
                      ? "發送"
                      : `重新發送 ${timeRemainingToSendOldEmailAgain}秒`}
                  </p>
                }
              />
              <InputWithLabel<UpdateUserEmailVerifyFormValues>
                id="newCode"
                label={t("new-email-verification-code")}
                placeholder={t("please-enter-the-verification-code")}
                type="text"
                register={register}
                errors={errors}
                endIcon={
                  <p
                    className={classNames(
                      "font-poppins text-sm font-semibold leading-5.5 text-dark-sky-blue",
                      {
                        "opacity-50": timeRemainingToSendNewEmailAgain > 0,
                      },
                    )}
                    onClick={resendNewEmailHandler}
                  >
                    {timeRemainingToSendNewEmailAgain === 0
                      ? "發送"
                      : `重新發送 ${timeRemainingToSendNewEmailAgain}秒`}
                  </p>
                }
              />
            </div>
          </div>

          <div>
            <CustomButton
              text={t("set-up-a-new-email-address")}
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

export default UpdateUserEmailVerify;
