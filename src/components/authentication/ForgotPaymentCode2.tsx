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
    password: yup
      .string()
      .required(t("enter-minimum-6-digit-password"))
      .min(6, t("enter-minimum-6-digit-password")),
    confirmPassword: yup
      .string()
      .required(t("re-enter-password"))
      .oneOf([yup.ref("password"), ""], "密碼不一致"),
  })
  .required();

export type ForgotPaymentCode1FormValues = yup.InferType<typeof Schema>;

const ForgotPaymentCode2 = ({ open }: { open: boolean }) => {
  const { t } = useTranslation();

  const closePaymentCodeStep2 = useAuthStore(
    (state) => state.closePaymentCodeStep2,
  );

  const createNewPaymentPassword = useAuthStore(
    (state) => state.createNewPaymentPassword,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPaymentCode1FormValues>({ resolver: yupResolver(Schema) });

  const onSubmit = (data: ForgotPaymentCode1FormValues) => {
    console.log(data);
    createNewPaymentPassword(data.password, data.confirmPassword);
  };

  return (
    <SidebarPageWrapper isOpen={open} onClose={closePaymentCodeStep2}>
      <CustomTopbar leftIconOnClick={closePaymentCodeStep2} />
      <div className="px-5 flex-1 flex flex-col">
        <h3 className="mb-3 text-Neutral-n800 text-center font-poppins text-3xl font-bold leading-8.5 tracking-[-0.15px]">
          {t("set-payment-password")}
        </h3>
        <p className="mb-8 text-Neutral-n600 text-center font-poppins text-sm leading-5.5 tracking-[0.14px]">
          {t("enter-payment-password")}
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 flex flex-col justify-between"
        >
          <div className="flex flex-col justify-between">
            <InputWithLabel<ForgotPaymentCode1FormValues>
              id="password"
              label={t("set-payment-password")}
              componentClassName="mb-8"
              type="password"
              register={register}
              errors={errors}
            />

            <InputWithLabel<ForgotPaymentCode1FormValues>
              id="confirmPassword"
              label={t("confirm-payment-password")}
              type="password"
              register={register}
              errors={errors}
            />
          </div>
          <div>
            <CustomButton
              text={t("set-payment-password")}
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

export default ForgotPaymentCode2;
