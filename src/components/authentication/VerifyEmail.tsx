import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
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
    code: yup.string().min(6).max(6).required(),
  })
  .required();

export type VerifyEmailFormValues = yup.InferType<typeof Schema>;

const VerifyEmail = ({ open }: { open: boolean }) => {
  const [timeRemainingToSendEmailAgain, setTimeRemainingToSendEmailAgain] =
    useState(0);
  const [emailVerificationSentOn, setEmailVerificationSentOn] = useState<
    number | undefined
  >(undefined);

  const resendEmailVerificationCode = useAuthStore(
    (state) => state.resendEmailVerificationCode,
  );
  const verifyEmailCodeForAccountActivation = useAuthStore(
    (state) => state.verifyEmailCodeForAccountActivation,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyEmailFormValues>({
    resolver: yupResolver(Schema),
  });

  const onSubmit = async (data: VerifyEmailFormValues) => {
    await verifyEmailCodeForAccountActivation(data.code);
  };

  const closeEmailVerificationModal = useAuthStore(
    (state) => state.closeEmailVerificationModal,
  );

  const resendCodeHandler = async () => {
    if (timeRemainingToSendEmailAgain > 0) return;
    const res = await resendEmailVerificationCode();
    if (!res) return;
    setEmailVerificationSentOn(Date.now());
    setTimeRemainingToSendEmailAgain(59);
  };

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

  return (
    <SidebarPageWrapper isOpen={open} onClose={closeEmailVerificationModal}>
      <CustomTopbar leftIconOnClick={closeEmailVerificationModal} />
      <div className="px-5 flex-1 flex flex-col">
        <h3 className="mb-3 text-Neutral-n800 text-center font-poppins text-3xl font-bold leading-8.5 tracking-[-0.15px]">
          Email verification
        </h3>
        <p className="text-Neutral-n600 text-center font-poppins text-sm leading-5.5 tracking-[0.14px] mb-8">
          Please enter the verification code sent to your email to activate your
          account.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 flex flex-col justify-between"
        >
          <div className="flex flex-col justify-between">
            <InputWithLabel<VerifyEmailFormValues>
              id="code"
              label={"Verification code"}
              placeholder={"Eneter 6 digit code"}
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
                  onClick={resendCodeHandler}
                >
                  {timeRemainingToSendEmailAgain === 0
                    ? "發送"
                    : `重新發送 ${timeRemainingToSendEmailAgain}秒`}
                </p>
              }
            />
          </div>
          <div>
            <CustomButton
              text={"submit"}
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

export default VerifyEmail;
