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
    username: yup.string().required(t("enter-nickname")),
  })
  .required();

export type ForgotAccPassword1FormValues = yup.InferType<typeof Schema>;

const UpdateUserName = ({ open }: { open: boolean }) => {
  const { t } = useTranslation();

  const closeUpdateUserName = useAuthStore(
    (state) => state.closeUpdateUserName,
  );

  const user = useAuthStore((state) => state.user);
  const updateUserName = useAuthStore((state) => state.updateUserName);

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
      await updateUserName({
        username: data.username,
        uuid: user?.UUID,
      });
    } catch (error) {
      const err = error as Error;
      console.error(err);
    }
  };

  useEffect(() => {
    if (user?.UUID) {
      setValue("username", user.UserName);
    }
  }, [user]);

  return (
    <SidebarPageWrapper isOpen={open} onClose={closeUpdateUserName}>
      <CustomTopbar leftIconOnClick={closeUpdateUserName} />
      <div className="px-5 flex-1 flex flex-col">
        <h3 className="mb-3 text-Neutral-n800 text-center font-poppins text-3xl font-bold leading-8.5 tracking-[-0.15px]">
          {t("change-nickname")}
        </h3>
        <p className="text-Neutral-n600 text-center font-poppins text-sm leading-5.5 tracking-[0.14px] mb-8">
          {t("update-nickname-desc")}
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 flex flex-col justify-between"
        >
          <div className="flex flex-col justify-between">
            <InputWithLabel<ForgotAccPassword1FormValues>
              id="username"
              label={t("nickname")}
              placeholder={t("enter-nickname")}
              type="text"
              register={register}
              errors={errors}
            />
          </div>
          <div>
            <CustomButton
              text={t("send")}
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

export default UpdateUserName;
