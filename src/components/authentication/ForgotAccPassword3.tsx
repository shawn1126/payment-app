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
    password: yup
      .string()
      .required(t("create-8-16-character-password-mix-letters&numbers"))
      .min(8, t("create-8-16-character-password-mix-letters&numbers"))
      .max(16, t("create-8-16-character-password-mix-letters&numbers")),
    confirmPassword: yup
      .string()
      .required(t("re-enter-password"))
      .oneOf([yup.ref("password"), ""], "兩次輸入的密碼不相同"),
  })
  .required();

export type ForgotAccPassword3FormValues = yup.InferType<typeof Schema>;

const ForgotAccPassword3 = ({ open }: { open: boolean }) => {
  const { t } = useTranslation();

  const openForgetPassword2 = useAuthStore(
    (state) => state.openForgetPassword2,
  );
  const closeForgetPassword3 = useAuthStore(
    (state) => state.closeForgetPassword3,
  );
  const ResetPasswordApi = useAuthStore((state) => state.resetPassword);
  // const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotAccPassword3FormValues>({ resolver: yupResolver(Schema) });

  const onSubmit = async (data: ForgotAccPassword3FormValues) => {
    try {
      const res = await ResetPasswordApi(data.password, data.confirmPassword);
      if (res) closeForgetPassword3();
    } catch (error) {
      const err = error as Error;
      console.error(err);
    }
  };

  return (
    <SidebarPageWrapper isOpen={open} onClose={closeForgetPassword3}>
      <CustomTopbar
        leftIconOnClick={() => {
          closeForgetPassword3();
          openForgetPassword2();
        }}
      />
      <div className="px-5 flex-1 flex flex-col">
        <h3 className="mb-3 text-Neutral-n800 text-center font-poppins text-3xl font-bold leading-8.5 tracking-[-0.15px]">
          {t("set-new-password")}
        </h3>
        <p className="mb-8 text-Neutral-n600 text-center font-poppins text-sm leading-5.5 tracking-[0.14px]">
          {t("enter-new-password-re-login-required")}
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 flex flex-col justify-between"
        >
          <div className="flex flex-col justify-between">
            <InputWithLabel<ForgotAccPassword3FormValues>
              id="password"
              label={t("set-new-password")}
              placeholder={t("enter-email")}
              type="password"
              register={register}
              errors={errors}
              componentClassName={classNames({ "mb-0": !errors.password })}
            />
            {!errors.password && (
              <p className="text-Neutral-n500 font-poppins text-sm leading-5.5 tracking-[0.14px] mt-1.5 mb-3">
                {t("create-8-16-character-password-mix-letters&numbers")}
              </p>
            )}

            <InputWithLabel<ForgotAccPassword3FormValues>
              id="confirmPassword"
              label={t("confirm-password")}
              placeholder={t("enter-email")}
              type="password"
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

export default ForgotAccPassword3;
