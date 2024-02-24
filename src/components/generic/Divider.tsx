import classNames from "classnames";

export interface DividerIProps {
  text?: string;
  className?: string;
  dividerClassName?: string;
}

const Divider = ({ text, className, dividerClassName }: DividerIProps) => {
  return (
    <div
      className={classNames("flex items-center", className, {
        "gap-5": text,
      })}
    >
      <div
        className={classNames(
          "flex-1 h-[1px] bg-cloudy-grey ",
          dividerClassName,
        )}
      ></div>
      {text && (
        <p className="text-Neutral-n500 font-poppins text-sm font-medium leading-5 tracking-[0.21px]">
          {text}
        </p>
      )}
      <div
        className={classNames(
          "flex-1 h-[1px] bg-cloudy-grey ",
          dividerClassName,
        )}
      ></div>
    </div>
  );
};

export default Divider;
