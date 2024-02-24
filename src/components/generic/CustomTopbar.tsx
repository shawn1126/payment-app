import { useNavigate } from "react-router-dom";
import classNames from "classnames";

export interface CustomTopbarIProps {
  componentClassName?: string;
  textClassName?: string;
  text?: string;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  rightIcon?: string;
  rightIconOnClick?: () => void;
  leftIconOnClick?: () => void;
  leftIcon?: string;
}
const CustomTopbar = (props: CustomTopbarIProps) => {
  const navigate = useNavigate();
  const {
    componentClassName,
    textClassName,
    text,
    showLeftIcon = true,
    showRightIcon = false,
    leftIcon = "/assets/icons/arrow-left.svg",
    rightIcon = "/assets/icons/plus.svg",
    rightIconOnClick,
    leftIconOnClick = () => navigate(-1),
  } = props;
  return (
    <div
      className={classNames(
        "p-4 flex justify-between items-center",
        componentClassName,
      )}
    >
      {showLeftIcon && (
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center bg-Neutral-n100"
          onClick={leftIconOnClick}
        >
          <img src={leftIcon} alt="logo" width={20} height={20} />
        </div>
      )}
      {text && (
        <p
          className={classNames(
            "text-midnight-blue text-center font-poppins text-2.5xl font-bold leading-8 tracking-[-0.13px]",
            textClassName,
          )}
        >
          {text}
        </p>
      )}
      {showRightIcon ? (
        <img
          src={rightIcon}
          alt="plus"
          width={28}
          height={28}
          onClick={rightIconOnClick}
        />
      ) : (
        <div className="w-8 h-8"></div>
      )}
    </div>
  );
};

export default CustomTopbar;
