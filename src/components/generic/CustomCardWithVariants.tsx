import { useState } from "react";
import { useTranslation } from "react-i18next";
// import { t } from "i18next";
interface CardWithVariantsIProps {
  isProfile: boolean;
  username: string;
  UID?: string;
  showBalance: boolean;
  setShowBalance: React.Dispatch<React.SetStateAction<boolean>>;
  balanceAmount?: number | string;
}
const CustomCardWithVariants = ({
  isProfile,
  username,
  UID,
  showBalance,
  setShowBalance,
  balanceAmount,
}: CardWithVariantsIProps) => {
  const { t } = useTranslation();

  const [copyText, setCopyText] = useState(t("copy"));

  const clickCopyHandler = () => {
    navigator.clipboard.writeText(UID!);
    setCopyText(t("copied"));
    setTimeout(() => {
      setCopyText(t("copy"));
    }, 1000);
  };

  return (
    <div className="rounded-[30px] bg-blue-gradient pt-3 pb-5 flex flex-col gap-5">
      <div className="flex justify-between items-center flex-1">
        <div className="absolute left-6 top-6 w-16">
          <img
            src="/assets/images/home/user.svg"
            alt=""
            className="h-[60px] w-[60px]"
          />

          <div className="bg-black bg-opacity-[0.80] h-4 w-4 rounded-full absolute right-1 bottom-0 flex items-center justify-center">
            <img src="/assets/icons/fi_image.svg" alt="" className="h-2 w-2" />
          </div>
        </div>

        {isProfile ? (
          <div className="flex flex-col justify-center text-Shade-White flex-1 max-[370px]:pl-16">
            <h1 className="text-base font-semibold text-center w-full">
              Hello, {username}
            </h1>
            <p className="flex gap-[10px] font-poppins text-sm font-medium flex-1 justify-center">
              PAYPAY ID : {`${UID?.slice(0, 4)}...${UID?.slice(-3)}`}
              <span className="font-normal" onClick={clickCopyHandler}>
                {copyText}
              </span>
            </p>
          </div>
        ) : (
          <>
            <h1 className="text-base font-semibold text-Shade-White text-center w-full">
              Hello, {username}
            </h1>
          </>
        )}
      </div>

      <div className="flex items-center justify-center gap-[10px]">
        <img src="/assets/icons/usdt.png" alt="" className="h-7 w-7" />
        <h1 className="text-[40px] text-Shade-White font-semibold">
          {/* round off to two decimals */}
          {showBalance ? Number(balanceAmount)?.toFixed(2) : "********"}
        </h1>
        <img
          src={
            showBalance
              ? "/assets/icons/white_eye-on.svg"
              : "/assets/icons/white-eye-off.svg"
          }
          alt="eye"
          className="h-5 w-5 cursor-pointer "
          onClick={() => setShowBalance((prev) => !prev)}
        />
      </div>
    </div>
  );
};

export default CustomCardWithVariants;
