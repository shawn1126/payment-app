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
    nickname: yup.string().required(t("nickname is required")),
    mobile: yup
      .string()
      .required()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits"),
    paymentCode: yup
      .string()
      .required(t("enter-minimum-6-digit-password"))
      .min(6, t("enter-minimum-6-digit-password")),
  })
  .required();

export type GoogleRegisterFormValues = yup.InferType<typeof Schema>;

const RegisterGoogle = ({ open }: { open: boolean }) => {
  const { t } = useTranslation();

  const googleSignUp = useAuthStore((state) => state.googleSignUp);
  const closeGoogleRegister = useAuthStore(
    (state) => state.closeGoogleRegister,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GoogleRegisterFormValues>({ resolver: yupResolver(Schema) });

  const onSubmit = (data: GoogleRegisterFormValues) => {
    console.log(data);
    googleSignUp(data.nickname, data.mobile.toString(), data.paymentCode);
  };

  return (
    <SidebarPageWrapper isOpen={open} onClose={closeGoogleRegister}>
      <CustomTopbar leftIconOnClick={closeGoogleRegister} />
      <div className="px-5 flex-1 flex flex-col">
        <h3 className="mt-3 mb-11 text-Neutral-n800 text-center font-poppins text-3xl font-bold leading-8.5 tracking-[-0.15px]">
          {t("register")}
        </h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 flex flex-col justify-between"
        >
          <div className="flex flex-col justify-between">
            <InputWithLabel<GoogleRegisterFormValues>
              id="nickname"
              label={t("nickname")}
              placeholder={t("enter-nickname")}
              type="text"
              register={register}
              errors={errors}
            />
            <InputWithLabel<GoogleRegisterFormValues>
              id="paymentCode"
              label={t("set-payment-password")}
              placeholder={t("enter-minimum-6-digit-password")}
              type="password"
              register={register}
              errors={errors}
              requiredSign
            />
            <InputWithLabel<GoogleRegisterFormValues>
              id="mobile"
              label={t("phone")}
              placeholder={t("enter-phone")}
              type="text"
              register={register}
              errors={errors}
              requiredSign
            />
          </div>
          <div>
            <CustomButton
              text={t("create-account")}
              type="submit"
              className="mt-12"
              isDisabled={Object.keys(errors).length > 0}
            />
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
        </form>
      </div>
    </SidebarPageWrapper>
  );
};

export default RegisterGoogle;
