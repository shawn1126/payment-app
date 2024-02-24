import { useState } from "react";
import { useTranslation } from "react-i18next";
import { QRCodeSVG } from "qrcode.react";
import { useAuthStore } from "store/authStore";
// import { t } from "i18next";
import { useGlobalStore } from "store/globalStore";
import { useHomeStore } from "store/homeStore";
import { NETWORK_TO_NAME_MAP } from "utils/constants";
import { maskUUID } from "utils/functions";

import { Divider, DualLineInfoBar, ResultDisplay } from "components/generic";
import TxReceipt from "components/generic/TxReceipt";

import TopUpLoading from "./TopUpLoading";

const TopUpAccDetailsModal = () => {
  const { t } = useTranslation();

  const [transactionResult, setTransactionResult] = useState<
    "success" | "fail" | null
  >(null);

  const [showPopUp, setShowPopUp] = useState(false);
  const isTopUpAccDetailsModalOpen = useHomeStore(
    (state) => state.isTopUpAccDetailsModalOpen,
  );
  const selectedNetwork = useGlobalStore((state) => state.selectedNetwork);
  const openNetworkModal = useGlobalStore((state) => state.openNetworkModal);
  const closeTopUpAccDetailsModal = useHomeStore(
    (state) => state.closeTopUpAccDetailsModal,
  );
  const user = useAuthStore((state) => state.user);
  const walletAddresses = user?.Walletaddress;

  return (
    <>
      <ResultDisplay
        finishBtnText={t("top-up")}
        finishBtnOnClick={() => setShowPopUp(true)}
        isOpen={isTopUpAccDetailsModalOpen}
        onClose={closeTopUpAccDetailsModal}
        direction="bottom"
        topBarProps={{
          leftIconOnClick: closeTopUpAccDetailsModal,
          showLeftIcon: true,
        }}
      >
        <div className="flex flex-col justify-center items-center gap-6">
          <div className="flex pt-[30px] justify-center items-center gap-2">
            <img
              src="/assets/images/home/user.svg"
              alt=""
              className="h-9 w-9"
            />
            <p className="font-poppins text-Neutral-n700 font-medium text-sm">
              PAYPAY ID : {maskUUID(user?.UUID || "")}
            </p>
          </div>
          <div className=" flex items-center justify-center">
            <QRCodeSVG
              value={walletAddresses?.[selectedNetwork] || ""}
              width={192}
              height={197}
            />
          </div>
        </div>
        <Divider className="mt-6 mb-2.5" />
        <div className="px-5 flex flex-col gap-3 pb-4">
          <DualLineInfoBar
            label={t("network")}
            value={NETWORK_TO_NAME_MAP?.[selectedNetwork]}
            icon="/assets/icons/vertical_switch.svg"
            valueClassName="text-sm"
            labelClasName="font-normal"
            onIconClick={openNetworkModal}
          />
          <DualLineInfoBar
            label={t("USDT-top-up-address")}
            value={walletAddresses?.[selectedNetwork]}
            icon="/assets/icons/Copy_alt_light.png"
            valueClassName="text-sm"
            labelClasName="font-normal"
            onIconClick={() =>
              navigator.clipboard.writeText(
                walletAddresses?.[selectedNetwork] || "",
              )
            }
          />
        </div>
      </ResultDisplay>

      <TopUpLoading
        closePopUp={() => setShowPopUp(false)}
        showPopUp={showPopUp}
        onConfirm={() => {
          setShowPopUp(false);
          setTransactionResult("success");
        }}
      />
      <TxReceipt
        heading={transactionResult === "success" ? "儲值成功" : "儲值失敗"}
        isOpen={transactionResult !== null}
        receiptType={transactionResult || "success"}
        onClose={() => setTransactionResult(null)}
        finishBtnText={t("completed")}
        finishBtnOnClick={() => {
          setTransactionResult(null);
          closeTopUpAccDetailsModal();
        }}
        amount={20}
        network={NETWORK_TO_NAME_MAP?.[selectedNetwork]}
        walletAddress={walletAddresses?.[selectedNetwork]}
      />
    </>
  );
};

export default TopUpAccDetailsModal;
