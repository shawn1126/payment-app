import { useTranslation } from "react-i18next";
// import { t } from "i18next";
import { useCollectionStore } from "store/collectionStore";

import {
  Divider,
  DualLineInfoBar,
  ResultDisplay,
  TickOrCrossIcon,
  UserAccDetails,
} from "components/generic";

const PayoutStatus = () => {
  const { t } = useTranslation();

  const isPayoutStatusOpen = useCollectionStore(
    (state) => state.isPayoutStatusOpen,
  );
  const closePayoutStatusModal = useCollectionStore(
    (state) => state.closePayoutStatusModal,
  );
  return (
    <div>
      <ResultDisplay
        finishBtnText={t("completed")}
        finishBtnOnClick={closePayoutStatusModal}
        isOpen={isPayoutStatusOpen}
        onClose={closePayoutStatusModal}
      >
        <div className="flex flex-col justify-center items-center pt-[35px]">
          <div className="flex justify-center items-center">
            <TickOrCrossIcon type={"tick"} />
          </div>
          <span className="mt-4 text-Neutral-n700 font-inter text-lg font-semibold justify-center items-center">
            {t("receiving-successful")}
          </span>
          <p className="mt-[42px] mb-3 text-black font-roboto text-2xl font-semibold justify-center items-center ">
            $31.18
          </p>
        </div>
        <Divider dividerClassName="!bg-light-grey" />
        <div className="px-5 pt-[30px]">
          <div className="py-[15.5px] pl-[23px] border-[1.5px] rounded-[20px] solid border-Neutral-n200 bg-Shade-White">
            <UserAccDetails
              img="/assets/images/home/user.svg"
              uid="8237428"
              className="!border-none !border-b-0 !mb-0"
            />
          </div>
        </div>
        <div className=" flex flex-col gap-3 px-5 pt-3">
          <DualLineInfoBar
            label={t("time")}
            labelClasName="text-Neutral-n400 font-poppins text-sm font-normal leading-[22px] tracking-[0.14px]"
            value="2023/12/09 20:03"
            valueClassName="text-black font-roboto text-xs font-semibold"
          />
          <DualLineInfoBar
            label={t("type")}
            labelClasName="text-Neutral-n400 font-poppins text-sm font-normal leading-[22px] tracking-[0.14px]"
            value={t("internal-transfer")}
            valueClassName="text-black font-roboto text-xs font-semibold"
          />
        </div>
      </ResultDisplay>
    </div>
  );
};

export default PayoutStatus;
