import classNames from "classnames";

interface TickOrCrossIconProps {
  type: "tick" | "cross";
  className?: string;
}
const TickOrCrossIcon = ({ type, className }: TickOrCrossIconProps) => {
  return (
    <div
      className={classNames(
        "w-[89px] h-[89px] flex items-center justify-center bg-[#E4F6F0] rounded-full",
        className,
      )}
    >
      <img
        src={
          type === "tick" ? "/assets/icons/tick.svg" : "/assets/icons/cross.svg"
        }
        alt={type}
        width={80}
        height={80}
      />
    </div>
  );
};

export default TickOrCrossIcon;
