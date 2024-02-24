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
    email: yup.string().email(t("enter-email")).required(t("enter-email")),
  })
  .required();

export type updateUserEmailFormValues = yup.InferType<typeof Schema>;

const UpdateUserEmail = ({ open }: { open: boolean }) => {
  const { t } = useTranslation();
  const user = useAuthStore((state) => state.user);
  const closeUpdateUserEmail = useAuthStore(
    (state) => state.closeUpdateUserEmail,
  );
  const resetEmail = useAuthStore((state) => state.resetEmail);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<updateUserEmailFormValues>({
    resolver: yupResolver(Schema),
  });
  const onSubmit = async (data: updateUserEmailFormValues) => {
    console.log(data.email);
    resetEmail(data.email);
  };

  useEffect(() => {
    if (user) {
      setValue("email", user.Email);
    }
  }, []);

  return (
    <SidebarPageWrapper isOpen={open} onClose={closeUpdateUserEmail}>
      <CustomTopbar leftIconOnClick={closeUpdateUserEmail} />
      <div className="px-5 flex-1 flex flex-col">
        <h3 className="mb-3 text-Neutral-n800 text-center font-poppins text-3xl font-bold leading-8.5 tracking-[-0.15px]">
          {t("change-the-email")}
        </h3>
        <p className="text-Neutral-n600 text-center font-poppins text-sm leading-5.5 tracking-[0.14px] mb-8">
          {t("enter-a-new-email-address")}
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 flex flex-col justify-between"
        >
          <div className="flex flex-col justify-between">
            <InputWithLabel<updateUserEmailFormValues>
              id="email"
              label={t("set-up-a-new-email-address")}
              placeholder={t("enter-email")}
              type="text"
              register={register}
              errors={errors}
            />
          </div>
          <div>
            <CustomButton
              text={t("next-step")}
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

export default UpdateUserEmail;
