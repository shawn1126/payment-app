import { useTranslation } from "react-i18next";
import { useTransferStore } from "store/transferStore";
import { formatEpochTime } from "utils/functions";

// import { t } from "i18next";
import {
  CustomTopbar,
  Divider,
  DualLineInfoBar,
  SidebarPageWrapper,
} from "components/generic";

const TransactionHistory = () => {
  const { t } = useTranslation();
  const txHistory = useTransferStore((state) => state.txHistory).sort(
    (a, b) => +b.Timestamp - +a.Timestamp,
  );

  return (
    <SidebarPageWrapper onClose={() => {}} isOpen={true} direction="right">
      <CustomTopbar showLeftIcon text={t("transaction-history")} />

      <div className="px-5 pb-5">
        {txHistory.map((data) => {
          return (
            <div key={Math.random()} className="flex flex-col gap-3 pb-3">
              <Divider />
              <div className="flex items-center">
                <div className="flex gap-1 items-center">
                  {data.Status === "Success" ? (
                    <img
                      src="/assets/icons/success.svg"
                      width={24}
                      height={24}
                      alt="result"
                    />
                  ) : data.Status === "Pending" ? (
                    <img
                      src="/assets/icons/pending.svg"
                      width={24}
                      height={24}
                      alt="result"
                    />
                  ) : (
                    <img
                      src="/assets/icons/fail.svg"
                      width={24}
                      height={24}
                      alt="result"
                    />
                  )}
                  <p className="text-sm font-roboto font-semibold">
                    {data.Status === "Success"
                      ? "完成"
                      : data.Status === "Pending"
                        ? "處理中"
                        : "失敗"}
                  </p>
                </div>
                <p className="w-10 h-6 bg-Neutral-n100 flex items-center justify-center rounded-[5px] text-Neutral-n700 text-sm leading-5.5 font-poppins ml-3">
                  ERC
                </p>
              </div>
              <div className="flex justify-between items-center">
                <DualLineInfoBar
                  label={"類型"}
                  value={
                    data.Network === "Internal"
                      ? "internal transfer"
                      : "內部轉帳"
                  }
                  labelClasName="w-full text-sm"
                  valueClassName="text-sm"
                  noVerticalGap
                />
                <DualLineInfoBar
                  label="數量"
                  value={data.Amount.toString()}
                  labelClasName="text-sm"
                  valueClassName="text-sm"
                  noVerticalGap
                />
                <DualLineInfoBar
                  label={"時間"}
                  value={formatEpochTime(+data.Timestamp)}
                  valueClassName="text-sm"
                  labelClasName="text-sm"
                  noVerticalGap
                />
              </div>
              <DualLineInfoBar
                label="Tx ID"
                icon="/assets/icons/Copy_alt_light.png"
                value={data.Txid}
                valueClassName="text-sm"
                labelClasName="text-sm"
                noVerticalGap
                onIconClick={() => {
                  navigator.clipboard.writeText(
                    "0xaceb38303d1f8bc1d628afb170773b27a8",
                  );
                }}
              />
              <DualLineInfoBar
                label={data.Network === "Internal" ? "PAYPAY ID" : "地址"}
                icon="/assets/icons/Copy_alt_light.png"
                value={data.Network === "Internal" ? data.To : data.To_address}
                valueClassName="text-sm"
                labelClasName="text-sm leading-5.5"
                noVerticalGap
                onIconClick={() => {
                  navigator.clipboard.writeText(
                    data.Network === "Internal" ? data.To : data.To_address,
                  );
                }}
              />
            </div>
          );
        })}
      </div>
    </SidebarPageWrapper>
  );
};

export default TransactionHistory;
