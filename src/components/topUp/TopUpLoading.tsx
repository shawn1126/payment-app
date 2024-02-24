import { useTranslation } from "react-i18next";

// import { t } from "i18next";
import { CustomButton, InformationModal } from "components/generic";
interface TopUpLoadingProps {
  showPopUp: boolean;
  closePopUp: () => void;
  onConfirm: () => void;
}

const TopUpLoading = ({
  closePopUp,
  showPopUp,
  onConfirm,
}: TopUpLoadingProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <InformationModal open={showPopUp} onClose={closePopUp}>
        <div className=" flex flex-col gap-7">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col justify-center items-center gap-3">
              <img
                src="/assets/icons/Loading 3.png"
                alt=""
                className="h-16 w-16"
              />
              <h2 className="font-semibold text-base font-inter text-black">
                {t("top-up-in-progress")}
              </h2>
            </div>
            <div className="text-base flex flex-col items-center justify-center text-dark-grey font-poppins">
              <span>{t("you-can-close-this-page!")} </span>
              <span className="text-center">
                {t("transfer-progress-can-be-viewed-in-transaction-record")}
              </span>
            </div>
          </div>
          <CustomButton
            text={t("close")}
            type="submit"
            className="text-sm !font-semibold"
            onClick={onConfirm}
          />
        </div>
      </InformationModal>
    </div>
  );
};

export default TopUpLoading;
