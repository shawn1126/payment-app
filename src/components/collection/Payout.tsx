import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "store/authStore";
import { networkTypes, qrScanResultType } from "store/globalStore";
// import { t } from "i18next";
import { useHomeStore } from "store/homeStore";
import { CoinsOptions } from "utils/constants";

import CollectionPayout from "components/generic/CollectionPayout";

import PayoutDetail from "./PayoutDetail";

const Payout = () => {
  const userDetails = useAuthStore((state) => state.user);
  const [selectedNetwork, setSelectedNetwork] = useState("Tron (TRC20)");
  const [enteredAmount, setEnteredAmount] = useState(0);

  const { t } = useTranslation();

  const isReceiveModalOpen = useHomeStore((state) => state.isReceiveModalOpen);
  const closeReceiveModal = useHomeStore((state) => state.closeReceiveModal);

  const walletAddresses = useAuthStore((state) => state.user?.Walletaddress);
  const networkOfSelectedCoin = CoinsOptions.find(
    (option) => option.coin === selectedNetwork,
  );
  const walletAddress = walletAddresses
    ? walletAddresses[networkOfSelectedCoin?.network]
    : "";

  const internalQrValue: qrScanResultType = {
    amount: enteredAmount.toString(),
    name: userDetails?.UserName,
    network: networkOfSelectedCoin?.network as Partial<networkTypes>,
    qrType: "directTransfer",
    transferType: "internal",
    uid: userDetails?.UUID,
  };

  const externalQrValue = walletAddress;
  return (
    <CollectionPayout
      isMiddleTab={false}
      firstTabText={t("PAYPAY 收款")}
      secondTabText={t("鏈上收款")}
      firstTabChildren={
        <PayoutDetail
          internal
          qrValue={JSON.stringify(internalQrValue)}
          setEnteredAmountInUsdt={setEnteredAmount}
        />
      }
      secondTabChildren={
        <PayoutDetail
          qrValue={JSON.stringify(externalQrValue)}
          selectedNetwork={selectedNetwork}
          setSelectedNetwork={setSelectedNetwork}
          setEnteredAmountInUsdt={setEnteredAmount}
          externalWalletAddress={walletAddress}
        />
      }
      isOpenCollectionModal={isReceiveModalOpen}
      closeCollectionModal={closeReceiveModal}
    />
  );
};

export default Payout;
