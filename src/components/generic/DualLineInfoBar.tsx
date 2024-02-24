import classNames from "classnames";

interface IProps {
  label?: string;
  value: string;
  subValue?: string;
  labelClasName?: string;
  valueClassName?: string;
  icon?: string;
  onIconClick?: () => void;
  borderB?: boolean;
  iconStart?: boolean;
  onBarClick?: () => void;
  noVerticalGap?: boolean;
}
const DualLineInfoBar = ({
  label,
  value,
  subValue,
  labelClasName,
  valueClassName,
  icon,
  onIconClick,
  borderB,
  iconStart = false,
  onBarClick,
  noVerticalGap,
}: IProps) => {
  const iconElement = icon && (
    <img
      src={icon}
      alt=""
      className="h-6 w-6 active:opacity-50"
      onClick={onIconClick}
      style={{ order: iconStart ? -1 : 1 }}
    />
  );
  return (
    <div
      className={classNames({
        "border-b-[1px] border-light-grey pb-[14px]  ": borderB,
      })}
      onClick={onBarClick}
    >
      <div
        className={classNames("flex flex-col", {
          "gap-1.5": !iconStart,
          "gap-0.5": iconStart,
          "!gap-0": noVerticalGap,
        })}
      >
        <p
          className={classNames(
            "text-Neutral-n400  leading-5.5 font-medium font-poppins",
            labelClasName,
          )}
        >
          {label}
        </p>
        <div
          className={classNames("flex  items-center", {
            "justify-between": !iconStart,
            "gap-[10px]": iconStart,
          })}
        >
          {iconStart && iconElement}
          <p
            className={classNames(
              "flex flex-col justify-between text-Neutral-n700 font-poppins font-medium leading-normal ",
              valueClassName,
            )}
          >
            <span className="break-all" style={{ lineBreak: "anywhere" }}>
              {" "}
              {value}{" "}
            </span>
            <span>{subValue}</span>
          </p>
          {/* {icon && (
            <img src={icon} alt="" className="h-6 w-6" onClick={onIconClick} />
          )} */}
          {!iconStart && iconElement}
        </div>
      </div>
    </div>
  );
};

export default DualLineInfoBar;
