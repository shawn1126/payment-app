import {
  CustomButton,
  CustomTopbar,
  SidebarPageWrapper,
} from "components/generic";
interface AmountModal {
  open: boolean;
  closeModal: () => void;
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  onSubmit: () => void;
  userPoints: number;
}

const AmountModal = ({
  open,
  closeModal,
  amount,
  setAmount,
  onSubmit,
  userPoints,
}: AmountModal) => {
  return (
    <SidebarPageWrapper isOpen={open} onClose={closeModal}>
      <div className="flex flex-col justify-between h-full">
        <div>
          <CustomTopbar text="輸入金額" leftIconOnClick={closeModal} />
          <div>
            <div className="flex justify-center items-center gap-1 mt-[18px] mb-4">
              <img
                src="/assets/icons/usdt.png"
                width="20"
                height="20"
                className="w-5 h-5"
              />
              <p className="text-Neutral-n700 font-poppins text-lg font-medium">
                USDT
              </p>
            </div>
            <input
              type="text"
              value={amount}
              onChange={(e) => {
                if (isNaN(+e.target.value)) return;
                setAmount(+e.target.value);
              }}
              className="text-[48px] font-bold leading-8 text-center w-full"
            />
            <p className="text-Supporting-color-Error text-center mt-2">
              {userPoints < amount && "餘額不足"}
            </p>
          </div>
        </div>
        <div className="px-5 pb-7">
          <CustomButton
            text="繼續"
            className="!h-[60px] !rounded-[20px] text-[24px]"
            onClick={onSubmit}
            isDisabled={amount === 0 || userPoints < amount}
          />
        </div>
      </div>
    </SidebarPageWrapper>
  );
};

export default AmountModal;
