import { useTranslation } from "react-i18next";
import { formatEpochTime } from "utils/functions";

// import { t } from "i18next";
import {
  Divider,
  DualLineInfoBar,
  ResultDisplay,
  TickOrCrossIcon,
} from "components/generic";
interface TransferReceiptDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  receiptType: "success" | "fail";
  finishBtnText: string;
  finishBtnOnClick: () => void;
  showTextBtn?: boolean;
  textBtnText?: string;
  textBtnOnClick?: () => void;
  receiverUID: string;
  amount: string;
  time: string;
  txId: string;
  type: string;
}

const TransferReceiptDetails = ({
  isOpen,
  onClose,
  receiptType,
  receiverUID,
  amount,
  time,
  txId,
  type,
  ...props
}: TransferReceiptDetailsProps) => {
  const { t } = useTranslation();

  return (
    <ResultDisplay isOpen={isOpen} onClose={onClose} {...props}>
      <div className="pt-9 pb-4 flex flex-col items-center">
        <TickOrCrossIcon type={receiptType === "success" ? "tick" : "cross"} />
        <p className="text-Neutral-n700 font-inter text-lg font-semibold mt-2.5 mb-10.5">
          {receiptType === "success"
            ? t("transfer-successful")
            : t("transfer-failed")}
        </p>
        <p className="text-[#000] font-roboto text-2xl font-semibold">
          ${amount}
        </p>
        <Divider className="mt-3 mb-7.5" dividerClassName="bg-light-grey" />
        <div className="px-5 flex flex-col gap-3 w-full">
          <DualLineInfoBar label={t("time")} value={formatEpochTime(+time)} />
          {/* "2023/12/09 20:03"  */}
          <DualLineInfoBar label="Tx ID" value={txId} />
          <DualLineInfoBar label={t("type")} value="internal transfer" />
          <DualLineInfoBar
            label={"收款人 PAYPAY ID"}
            value={receiverUID || ""}
          />
        </div>
      </div>
    </ResultDisplay>
  );
};

export default TransferReceiptDetails;
