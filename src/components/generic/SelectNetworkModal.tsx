import { useTranslation } from "react-i18next";
// import { t } from "i18next";
import { useGlobalStore } from "store/globalStore";
import { NETWORK_DATA_LIST } from "utils/constants";

import { CustomTopbar, SidebarPageWrapper } from "components/generic";

const SelectNetworkModal = ({ open }: { open: boolean }) => {
  const { t } = useTranslation();

  const closeNetworkModal = useGlobalStore((state) => state.closeNetworkModal);
  const setSelectedNetwork = useGlobalStore(
    (state) => state.setSelectedNetwork,
  );

  return (
    <SidebarPageWrapper
      isOpen={open}
      onClose={closeNetworkModal}
      direction="bottom"
    >
      <div className="font-poppins">
        <CustomTopbar
          showLeftIcon
          text={t("top-up")}
          textClassName=" flex-1"
          leftIconOnClick={closeNetworkModal}
        />
        <p className="px-4 text-Neutral-n400 text-sm font-normal font-poppins leading-6">
          {t(
            "system-displays-supported-networks-only-recharging-via-others-may-risk-asset-loss",
          )}
        </p>
        {/* card */}
        <div className="px-5 py-4 flex flex-col gap-3">
          {NETWORK_DATA_LIST.map(({ token, network }) => {
            return (
              <div
                key={token}
                className="bg-snow-white flex-1 flex flex-col  py-4 px-4 rounded-[8px] shadow-network-card"
                onClick={() => {
                  setSelectedNetwork(network);
                  closeNetworkModal();
                }}
              >
                <h1 className="text-base font-bold text-dark-grey font-poppins">
                  {token}
                </h1>
                <p className="text-xs font-medium text-storm-grey">
                  手續費 1 USDT
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </SidebarPageWrapper>
  );
};

export default SelectNetworkModal;
