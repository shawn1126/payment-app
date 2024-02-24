import { useTranslation } from "react-i18next";

import { CustomButton, InformationModal } from "components/generic";

interface CustomerCareModalProps {
  showPopUp: boolean;
  closePopUp: () => void;
}

const CustomerCareModal = ({
  closePopUp,
  showPopUp,
}: CustomerCareModalProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <InformationModal open={showPopUp} onClose={closePopUp}>
        <div className=" flex flex-col gap-7">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col justify-center items-center gap-3">
              <h2 className="font-semibold text-base font-inter text-black">
                聯繫客服
              </h2>
            </div>
            <div className="text-base flex flex-col items-center justify-center text-dark-grey font-poppins">
              <span>請聯繫以下客服信箱 </span>
              <span className="text-center">paypay@sent.com</span>
            </div>
          </div>
          <CustomButton
            text={t("close")}
            type="submit"
            className="text-sm !font-semibold"
            onClick={closePopUp}
          />
        </div>
      </InformationModal>
    </div>
  );
};

export default CustomerCareModal;
