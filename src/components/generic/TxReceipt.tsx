import { useTranslation } from "react-i18next";

// import { t } from "i18next";
import {
  Divider,
  DualLineInfoBar,
  ResultDisplay,
  TickOrCrossIcon,
} from "components/generic";
interface TxReceiptIProps {
  isOpen: boolean;
  onClose: () => void;
  receiptType: "success" | "fail";
  finishBtnText: string;
  finishBtnOnClick: () => void;
  showTextBtn?: boolean;
  textBtnText?: string;
  textBtnOnClick?: () => void;
  amount: number;
  walletAddress: string;
  network: string;
  heading?: string;
}

const TxReceipt = ({
  isOpen,
  onClose,
  receiptType,
  amount,
  walletAddress,
  network,
  heading,
  ...Iprops
}: TxReceiptIProps) => {
  const { t } = useTranslation();

  return (
    <ResultDisplay isOpen={isOpen} onClose={onClose} {...Iprops}>
      <div className="pt-9 pb-4 flex flex-col items-center">
        <TickOrCrossIcon type={receiptType === "success" ? "tick" : "cross"} />
        <p className="text-Neutral-n700 font-inter text-lg font-semibold mt-2.5 mb-10.5">
          {heading}
        </p>
        <p className="text-[#000] font-roboto text-2xl font-semibold">
          ${amount}
        </p>
        <div className="pt-3 w-full">
          <Divider dividerClassName="bg-light-grey" />
        </div>
        <div className="px-5 pt-[18px] flex flex-col gap-[18px] w-full pb-3">
          <DualLineInfoBar
            label={t("time")}
            value="2023/12/08 13:29:52"
            valueClassName="text-black font-semibold text-xs font-roboto"
          />

          <div className="pt-1 flex flex-col gap-1">
            <DualLineInfoBar
              label="Tx ID"
              value="0xaceb38303d1f8bc1d628afb170773b27"
              subValue="a828c2a2ee669c00f31056436d62063c"
              valueClassName="text-black !font-semibold text-xs font-roboto"
              icon="/assets/icons/Copy_alt_light.png"
            />
            <DualLineInfoBar
              label={t("type")}
              value={t("on-chain-coin-deposit")}
              valueClassName="text-black font-semibold text-xs font-roboto"
            />
          </div>
          <div className='className="pt-1 flex flex-col gap-1'>
            <DualLineInfoBar
              label={t("deposit-address")}
              value={walletAddress}
              subValue="66E35C74"
              valueClassName="text-black !font-semibold text-xs font-roboto"
              icon="/assets/icons/Copy_alt_light.png"
            />
            <DualLineInfoBar
              label={t("transaction-fee")}
              value="1 USDT"
              valueClassName="text-black font-semibold text-xs font-roboto"
            />
          </div>
          <DualLineInfoBar
            label={t("network")}
            value={network}
            valueClassName="text-black !font-semibold text-xs font-roboto"
          />
        </div>
      </div>
    </ResultDisplay>
  );
};

export default TxReceipt;
