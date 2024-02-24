import classNames from "classnames";
import { useGlobalStore } from "store/globalStore";
export type ContactType = {
  img: string;
  uid?: string;
};
import { useTranslation } from "react-i18next";
// import { t } from "i18next";

interface UserAccDetailsIProps extends ContactType {
  label?: string;
  showSelectContactBtn?: boolean;
  className?: string;
  isDisabled?: boolean;
  inputValue?: string;
  setInputValue?: (value: string) => void;
}

const UserAccDetails = ({
  label,
  img,
  className,
  showSelectContactBtn = false,
  isDisabled = true,
  inputValue = "",
  setInputValue = () => {},
}: UserAccDetailsIProps) => {
  const { t } = useTranslation();

  const openContactListDrawer = useGlobalStore(
    (state) => state.openContactListDrawer,
  );
  return (
    <div className={classNames("border-b border-[#D9D9D9] mb-3", className)}>
      <p className="text-Neutral-n400 font-poppins text-sm leading-5.5 tracking-[0.14px]">
        {label}
      </p>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2.5 my-1.5 flex-1">
          <img src={img} alt="" className="h-9 w-9" />
          <div className="flex items-center flex-1">
            <p className="text-Neutral-n700 font-poppins text-sm font-medium">
              PAYPAY ID :
            </p>
            <div className="flex-1 flex">
              <input
                className="font-medium text-sm leading-5 text-Neutral-n700 outline-0 inline-block w-full px-0.5 py-1 ml-2 mr-2 flex-1"
                disabled={isDisabled}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
          </div>
        </div>
        {showSelectContactBtn && (
          <button
            className="w-36 py-2 bg-[#33415533] rounded-lg text-dark-sky-blue font-poppins text-sm font-medium active:opacity-90 active:translate-y-0.5 active:shadow-md"
            onClick={openContactListDrawer}
          >
            {t("frequent-contacts")}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserAccDetails;
