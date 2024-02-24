import { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  icon: string;
  label: string;
}
const RoundedCard = ({ icon, label, ...rest }: IProps) => {
  return (
    <div {...rest}>
      <div className="bg-cotton-white rounded-[22px] h-28 flex-1 flex items-center justify-center shadow-card">
        <div className="flex gap-2 items-center">
          <img src={icon} alt="" className="h-6 w-6" />
          <h2 className="text-sm font-normal text-Neutral-n700">{label}</h2>
        </div>
      </div>
    </div>
  );
};

export default RoundedCard;
