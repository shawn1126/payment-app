import { ButtonHTMLAttributes } from "react";
import classNames from "classnames";
export interface CustomButtonIProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
  leftIcon?: string;
  rightIcon?: string;
  isDisabled?: boolean;
  variant?: "info" | "neutral" | "success" | "warning" | "danger";
  children?: React.ReactNode;
}

const CustomButton = ({
  text,
  type = "button",
  className,
  onClick,
  leftIcon,
  rightIcon,
  isDisabled,
  variant = "info",
  children,
  ...rest
}: CustomButtonIProps) => {
  return (
    <button
      type={type}
      className={classNames(
        "flex items-center justify-center gap-4 px-6 py-2 rounded-full font-poppins text-sm font-medium leading-5 tracking-[0.21px] w-full h-11  active:opacity-90 active:shadow-md active:translate-y-0.5",
        {
          "bg-dark-sky-blue text-Shade-White": variant === "info",
          "bg-Shade-White text-Neutral-n800 border-2 border-Neutral-n200":
            variant === "neutral",
        },
        {
          "opacity-40 cursor-not-allowed": isDisabled,
        },
        className,
      )}
      onClick={onClick}
      {...rest}
      disabled={isDisabled}
    >
      {leftIcon && (
        <img src={leftIcon} alt="left-icon" width={24} height={24} />
      )}
      {text && text}
      {children && children}
      {rightIcon && (
        <img src={rightIcon} alt="right-icon" width={24} height={24} />
      )}
    </button>
  );
};

export default CustomButton;
