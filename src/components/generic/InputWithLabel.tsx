import { ReactNode, useState } from "react";
import {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import classNames from "classnames";

interface InputWithLabelIProps<TFormValues extends FieldValues> {
  id: Path<TFormValues>;
  register: UseFormRegister<TFormValues>;
  type: "text" | "password" | "number" | "email" | "date";
  label?: string;
  placeholder?: string;
  componentClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
  errorIcon?: boolean;
  requiredSign?: boolean;
  endIcon?: ReactNode;
  inputProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
}

const InputWithLabel = <TFormValues extends FieldValues>({
  id,
  register,
  type = "text",
  label,
  placeholder,
  componentClassName,
  labelClassName,
  inputClassName,
  errors,
  errorIcon = false,
  requiredSign = false,
  endIcon = null,
  inputProps,
}: InputWithLabelIProps<TFormValues>) => {
  const [currentType, setCurrentType] = useState(type);
  return (
    <div
      className={classNames("flex flex-col gap-1.5 mb-3", componentClassName)}
    >
      <p
        className={classNames(
          "text-Neutral-n800 font-poppins text-sm font-normal leading-5.5 tracking-[0.14px] gap-1.5 flex items-center",
          labelClassName,
        )}
      >
        <span>{label}</span>
        {requiredSign && (
          <span className="text-Supporting-color-Error font-poppins text-sm leading-5.5 tracking-[0.14px]">
            *
          </span>
        )}
      </p>
      <div className="relative w-full">
        <input
          className={classNames(
            "px-4 py-3 placeholder:text-Neutral-n400 text-Neutral-n700 font-poppins text-sm font-normal leading-5.5 tracking-[0.14px] rounded-lg border-1.5 border-Neutral-n200 bg-Shade-White w-full",
            inputClassName,
          )}
          placeholder={placeholder}
          type={currentType}
          {...register(id)}
          {...inputProps}
        />
        {currentType === "password" ? (
          <button
            className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-Shade-White pl-2"
            onClick={() => setCurrentType("text")}
          >
            <img src="assets/icons/eye-off.svg" alt="eye" />
          </button>
        ) : (
          <>
            {type === "password" && (
              <button
                className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-Shade-White pl-2"
                onClick={() => setCurrentType("password")}
              >
                <img src="assets/icons/eye-on.svg" alt="eye" />
              </button>
            )}
          </>
        )}
        {endIcon && (
          <div className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-Shade-White pl-2">
            {endIcon}
          </div>
        )}
      </div>
      {errors && errors[id] && (
        <div className="flex gap-1.5 items-center">
          {errorIcon && (
            <img
              src="assets/icons/info.svg"
              alt="error"
              width={20}
              height={20}
            />
          )}
          <p className="text-Supporting-color-Error font-poppins text-sm font-normal leading-5.5 tracking-[0.14px]">
            {errors[id].message}
          </p>
        </div>
      )}
    </div>
  );
};

export default InputWithLabel;
