import { useState } from "react";
import { useTranslation } from "react-i18next";
// import { t } from "i18next";
import { useAuthStore } from "store/authStore";
import { useGlobalStore } from "store/globalStore";
import { useHomeStore } from "store/homeStore";

import { Payout } from "components/collection";
import { CustomCardWithVariants } from "components/generic";
import { RoundedCard } from "components/home";
import { TopUpAccDetailsModal } from "components/topUp";
import { Withdraw } from "components/withdraw";

const Home = () => {
  const { t } = useTranslation();

  const [showBalance, setShowBalance] = useState(true);
  const openSendTokenModal = useHomeStore((state) => state.openSendTokenModal);
  const openReceiveModal = useHomeStore((state) => state.openReceiveModal);
  const openNetworkModal = useGlobalStore((state) => state.openNetworkModal);
  const openTopUpAccDetailsModal = useHomeStore(
    (state) => state.openTopUpAccDetailsModal,
  );
  const openWithdrawModal = useHomeStore((state) => state.openWithdrawModal);

  const user = useAuthStore((state) => state.user);

  const topUpHandler = () => {
    openTopUpAccDetailsModal();

    openNetworkModal();
  };

  return (
    <div className="bg-milk-white w-full font-poppins px-4 flex flex-col gap-1 min-h-screen pt-3">
      <CustomCardWithVariants
        isProfile={false}
        username={user?.UserName}
        showBalance={showBalance}
        setShowBalance={setShowBalance}
        balanceAmount={user?.Points || 0}
      />
      <div className=" bg-milk-white grid grid-cols-2 py-4 gap-3">
        <RoundedCard
          icon="/assets/icons/cash.svg"
          label={t("withdraw")}
          onClick={openWithdrawModal}
        />
        <RoundedCard
          icon="/assets/icons/collection.svg"
          label={t("receiving")}
          onClick={openReceiveModal}
        />
        <RoundedCard
          icon="/assets/icons/money-transfer.svg"
          label={t("transfer")}
          onClick={openSendTokenModal}
        />
        <RoundedCard
          icon="/assets/icons/add.svg"
          label={t("top-up")}
          onClick={topUpHandler}
        />
      </div>
      <TopUpAccDetailsModal />
      <Payout />
      <Withdraw />
    </div>
  );
};

export default Home;
