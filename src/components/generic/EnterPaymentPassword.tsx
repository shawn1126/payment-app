import { useTranslation } from "react-i18next";

// import { t } from "i18next";
import { CustomButton, InformationModal } from "components/generic";
interface EnterPaymentPasswordProps {
  open: boolean;
  closeModal: () => void;
  value: string;
  setValue: (value: string) => void;
  onConfirm: () => void;
  error?: string;
}

const EnterPaymentPassword = ({
  open,
  closeModal,
  value,
  setValue,
  onConfirm,
  error,
}: EnterPaymentPasswordProps) => {
  const { t } = useTranslation();

  return (
    <InformationModal open={open} onClose={closeModal}>
      <div className="flex flex-col items-center">
        <p className="text-center text-Neutral-n700 font-poppins text-base font-semibold">
          Payment password
        </p>
        <input
          className="mt-6 border-2 border-light-sky-blue rounded-md px-4 py-1.5 max-w-[90%]"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="password"
        />
        {error && (
          <p className="text-Supporting-color-Error font-poppins text-sm font-normal leading-5.5 tracking-[0.14px]">
            {error}
          </p>
        )}
        <CustomButton
          text={t("confirm-transfer")}
          className="mt-[30px] h-[38px]"
          type="button"
          isDisabled={value.length < 6}
          onClick={onConfirm}
        />
      </div>
    </InformationModal>
  );
};

export default EnterPaymentPassword;
