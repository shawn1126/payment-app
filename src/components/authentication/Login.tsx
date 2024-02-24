import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import { t } from "i18next";
import { useAuthStore } from "store/authStore";
import * as yup from "yup";

import { CustomButton, Divider, InputWithLabel } from "components/generic";

const Schema = yup
  .object({
    emailOrPhone: yup.string().required("使用者名稱或電子郵件錯誤"),
    password: yup
      .string()
      .required(t("incorrect-password"))
      .min(8, "min 8 characters")
      .max(16, "max 16 characters"),
  })
  .required();

export type LoginFormValues = yup.InferType<typeof Schema>;

const Login = () => {
  const { t } = useTranslation();

  const openGeneralRegister = useAuthStore(
    (state) => state.openGeneralRegister,
  );
  const googleSignIn = useAuthStore((state) => state.googleSignIn);
  const LoginApi = useAuthStore((state) => state.login);
  const openForgetPassword1 = useAuthStore(
    (state) => state.openForgetPassword1,
  );
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: yupResolver(Schema) });
  const searchParams = new URLSearchParams(window.location.search);
  const transferTo = searchParams.get("transferTo");
  const onSubmit = async (data: LoginFormValues) => {
    const dataToSubmit = {
      emailorPhone: data.emailOrPhone,
      password: data.password,
    };
    const res = await LoginApi(dataToSubmit);
    if (res) {
      // navigate to home but keep the query params
      console.log("transferTologin", transferTo);
      if (transferTo) {
        navigate(`/home?transferTo=${transferTo}`);
      } else {
        navigate("/home");
      }
    }
  };

  const googleClickHanlder = async () => {
    const res = await googleSignIn();
    if (res) {
      console.log("transferTologin", transferTo);
      if (transferTo) {
        navigate(`/home?transferTo=${transferTo}`);
      } else {
        navigate("/home");
      }
    }
  };

  return (
    <div>
      <h3 className="text-center text-Neutral-n800 font-poppins text-3xl font-bold leading-8.5 tracking-[-0.15px] mt-19 mb-11">
        {t("log-in")}
      </h3>
      <form className="form-container px-5" onSubmit={handleSubmit(onSubmit)}>
        <div
          className={classNames(
            "w-full h-[222px]",
            // if error exist in both username and password, then height will be 250px
            {
              "h-[250px]": Object.keys(errors).length > 1,
            },
          )}
        >
          <InputWithLabel<LoginFormValues>
            label={t("email-or-phone")}
            placeholder={t("enter-email-or-phone")}
            type="text"
            id="emailOrPhone"
            register={register}
            errors={errors}
          />
          <InputWithLabel<LoginFormValues>
            label={t("password")}
            placeholder={t("enter-password")}
            type="password"
            id="password"
            register={register}
            errors={errors}
            errorIcon={true}
          />
          <p
            className="text-light-sky-blue text-right font-poppins text-sm font-medium leading-5.5 tracking-[0.175px] underline"
            onClick={openForgetPassword1}
          >
            {t("forgot-password?")}
          </p>
        </div>
        <CustomButton
          text={t("log-in")}
          type="submit"
          className="mt-5.5"
          isDisabled={Object.keys(errors).length > 0}
        />
      </form>
      <p className="mt-3 text-center text-Neutral-n500 font-poppins text-sm leading-5.5 tracking-[0.14px]">
        {t("no-account?")}&nbsp;
        <span
          className="text-dark-sky-blue font-bold underline"
          onClick={openGeneralRegister}
        >
          {t("register")}
        </span>
      </p>
      <div className="px-4">
        <Divider text={t("or")} className="mt-[105px]" />
        <CustomButton
          text={t("google-sign-in")}
          leftIcon="/assets/icons/google.svg"
          variant="neutral"
          className="h-12.5 mt-5.5 mb-10"
          onClick={googleClickHanlder}
        />
      </div>
    </div>
  );
};

export default Login;
