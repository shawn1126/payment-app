import { useNavigate } from "react-router-dom";
import { useAuthStore } from "store/authStore";
import { useGlobalStore } from "store/globalStore";

import { CustomButton, InformationModal } from "components/generic";

const ResetPaymentPasswordSuggestModal = () => {
  const isRequirePaymentPassResetModalOpen = useGlobalStore(
    (state) => state.isRequirePaymentPassResetModalOpen,
  );
  const setIsRequirePaymentPassResetModalOpen = useGlobalStore(
    (state) => state.setIsRequirePaymentPassResetModalOpen,
  );
  const openPaymentCodeStep1 = useAuthStore(
    (state) => state.openPaymentCodeStep1,
  );
  const navigate = useNavigate();
  const openModalHandler = () => {
    navigate("/profile");
    setIsRequirePaymentPassResetModalOpen(false);
    openPaymentCodeStep1();
  };
  return (
    <div>
      <InformationModal
        open={isRequirePaymentPassResetModalOpen}
        onClose={() => setIsRequirePaymentPassResetModalOpen(false)}
      >
        <div className=" flex flex-col gap-7">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col justify-center items-center gap-3">
              <h2 className="font-semibold text-base font-inter text-black">
                已達錯誤上限
              </h2>
            </div>
            <div className="text-base flex flex-col items-center justify-center text-dark-grey font-poppins">
              <span>請重新設置支付密碼 </span>
            </div>
          </div>
          <CustomButton
            text={"前往設置支付密碼"}
            type="submit"
            className="text-sm !font-semibold"
            onClick={openModalHandler}
          />
        </div>
      </InformationModal>
    </div>
  );
};

export default ResetPaymentPasswordSuggestModal;
