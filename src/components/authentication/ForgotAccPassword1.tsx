import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
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
    email: yup.string().email().required(t("enter-email")),
  })
  .required();

export type ForgotAccPassword1FormValues = yup.InferType<typeof Schema>;

const ForgotAccPassword1 = ({ open }: { open: boolean }) => {
  const { t } = useTranslation();

  const openForgetPassword2 = useAuthStore(
    (state) => state.openForgetPassword2,
  );
  const closeForgetPassword1 = useAuthStore(
    (state) => state.closeForgetPassword1,
  );
  const setEnteredEmail = useAuthStore((state) => state.setEnteredEmail);
  const setCodeSentOn = useAuthStore((state) => state.setCodeSentOn);
  const ForgetPasswordApi = useAuthStore((state) => state.forgotEmailPassword);
  const userEmailAndUid = useAuthStore((state) => state.userEmailAndUid);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ForgotAccPassword1FormValues>({
    resolver: yupResolver(Schema),
  });
  const onSubmit = async (data: ForgotAccPassword1FormValues) => {
    try {
      setEnteredEmail(data.email);
      const res = await ForgetPasswordApi(data.email);
      if (res) {
        setCodeSentOn(new Date().getTime());
        openForgetPassword2();
      }
    } catch (error) {
      const err = error as Error;
      console.error(err);
    }
  };

  useEffect(() => {
    if (userEmailAndUid?.email) {
      setValue("email", userEmailAndUid.email);
    }
  }, [userEmailAndUid]);

  return (
    <SidebarPageWrapper isOpen={open} onClose={closeForgetPassword1}>
      <CustomTopbar leftIconOnClick={closeForgetPassword1} />
      <div className="px-5 flex-1 flex flex-col">
        <h3 className="mb-3 text-Neutral-n800 text-center font-poppins text-3xl font-bold leading-8.5 tracking-[-0.15px]">
          {t("forgot-password?")}
        </h3>
        <p className="text-Neutral-n600 text-center font-poppins text-sm leading-5.5 tracking-[0.14px] mb-8">
          {t("no-worries!-enter-email-for-verification-code-to-reset-password")}
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 flex flex-col justify-between"
        >
          <div className="flex flex-col justify-between">
            <InputWithLabel<ForgotAccPassword1FormValues>
              id="email"
              label={t("email")}
              placeholder={t("enter-email")}
              type="email"
              register={register}
              errors={errors}
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

export default ForgotAccPassword1;
