import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterInputType } from "api/apiTypes";
import { t } from "i18next";
import { useAuthStore } from "store/authStore";
import * as yup from "yup";

import {
  CustomButton,
  CustomTopbar,
  InputWithLabel,
  SidebarPageWrapper,
} from "components/generic";

// 暱稱, 請輸入您的暱稱, 信箱, 請輸入您的信箱, 手機號碼, 請輸入您的手機號碼, 密碼, 請至少輸入 8 ～ 16 位英文與數字密碼, 確認密碼, 請再次輸入密碼, 支付密碼, 請至少輸入 6 位數字密碼
// Nickname, please enter your nickname, Email, please enter your email, Mobile phone number, please enter your mobile number, Password, please enter at least 8 to 16 digits English and numeric password, Confirm password, please enter password again, paymentCode , please enter at least a 6-digit password

const Schema = yup
  .object({
    nickname: yup.string(),
    email: yup.string().email().required(t("enter-email")),
    mobile: yup
      .string()
      .required()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits"),

    password: yup
      .string()
      .required(t("create-8-16-character-password-mix-letters&numbers"))
      .min(8, t("create-8-16-character-password-mix-letters&numbers"))
      .max(16, t("create-8-16-character-password-mix-letters&numbers")),
    confirmPassword: yup
      .string()
      .required(t("re-enter-password"))
      .oneOf([yup.ref("password"), ""], "密碼不一致"),

    paymentCode: yup
      .string()
      .required(t("enter-minimum-6-digit-password"))
      .min(6, t("enter-minimum-6-digit-password")),
  })
  .required();
export type DefaultRegisterFormValues = yup.InferType<typeof Schema>;

const RegisterDefault = ({ open }: { open: boolean }) => {
  const { t } = useTranslation();

  const closeGeneralRegister = useAuthStore(
    (state) => state.closeGeneralRegister,
  );
  const RegisterApi = useAuthStore((state) => state.register);
  //const createSignUp = useAuthStore((state) => state.signup);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DefaultRegisterFormValues>({ resolver: yupResolver(Schema) });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const dataToSubmit: RegisterInputType = {
        email: data.email,
        username: data.nickname,
        phonenumber: data.mobile.toString(),
        paymentPassword: data.paymentCode,
        password1: data.password,
        password2: data.confirmPassword,
      };
      await RegisterApi(dataToSubmit);
      closeGeneralRegister();
    } catch (error) {
      const err = error as Error;
      console.error(err);
    }
  });

  return (
    <SidebarPageWrapper isOpen={open} onClose={closeGeneralRegister}>
      <CustomTopbar leftIconOnClick={closeGeneralRegister} />
      <div className="px-5">
        <h3 className="mt-3 mb-11 text-Neutral-n800 text-center font-poppins text-3xl font-bold leading-8.5 tracking-[-0.15px]">
          {t("register")}
        </h3>
        <form onSubmit={onSubmit}>
          <InputWithLabel<DefaultRegisterFormValues>
            id="nickname"
            label={t("nickname")}
            placeholder={t("enter-nickname")}
            type="text"
            register={register}
            errors={errors}
          />
          <InputWithLabel<DefaultRegisterFormValues>
            id="email"
            label={t("email")}
            placeholder={t("enter-email")}
            type="text"
            register={register}
            errors={errors}
            requiredSign
          />
          <InputWithLabel<DefaultRegisterFormValues>
            id="mobile"
            label={t("phone")}
            placeholder={t("enter-phone")}
            type="text"
            register={register}
            errors={errors}
            requiredSign
          />
          <InputWithLabel<DefaultRegisterFormValues>
            id="password"
            label={t("password")}
            placeholder={t(
              "create-8-16-character-password-mix-letters&numbers",
            )}
            type="password"
            register={register}
            errors={errors}
            requiredSign
          />
          <InputWithLabel<DefaultRegisterFormValues>
            id="confirmPassword"
            label={t("confirm-password")}
            placeholder={t("re-enter-password")}
            type="password"
            register={register}
            errors={errors}
            requiredSign
          />
          <InputWithLabel<DefaultRegisterFormValues>
            id="paymentCode"
            label={t("set-payment-password")}
            placeholder={t("enter-minimum-6-digit-password")}
            type="password"
            register={register}
            errors={errors}
            requiredSign
          />
          <CustomButton
            text={t("create-account")}
            type="submit"
            className="mt-12"
            isDisabled={Object.keys(errors).length > 0}
          />
        </form>
        <p className="my-4 text-Neutral-n600 text-center font-poppins text-sm leading-5.5 tracking-[0.14px]">
          {t("by-registering-you-agree")}
          <span className="text-light-sky-blue underline cursor-pointer ml-0.5">
            {t("terms-of-service")}
          </span>
          {t("and")}
          <span className="text-light-sky-blue underline cursor-pointer ml-0.5">
            {t("privacy-policy")}
          </span>
          。
        </p>
      </div>
    </SidebarPageWrapper>
  );
};

export default RegisterDefault;
