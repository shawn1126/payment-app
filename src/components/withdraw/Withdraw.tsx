import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { t } from "i18next";
import { useAuthStore } from "store/authStore";
import { useGlobalStore } from "store/globalStore";
import { useHomeStore } from "store/homeStore";
import { NETWORK_TO_NAME_MAP } from "utils/constants";
import * as yup from "yup";

import {
  CustomButton,
  CustomTopbar,
  InputWithLabel,
  SidebarPageWrapper,
  TxReceipt,
} from "components/generic";

import { PreviewAndConfirm } from ".";

const Schema = yup
  .object({
    networkAddress: yup
      .string()
      .required("wrong network address")
      .min(30, "enter a valid address"),
    selectedNetwork: yup.string(),
    amount: yup
      .string()
      .required("please enter amount")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(1, t("amount must be > 0")),
  })
  .required();

export type WithdrawFormValues = yup.InferType<typeof Schema>;

const Withdraw = () => {
  const { t } = useTranslation();

  const isWithdrawModalOpen = useHomeStore(
    (state) => state.isWithdrawModalOpen,
  );
  const closeWithdrawModal = useHomeStore((state) => state.closeWithdrawModal);
  const openNetworkModal = useGlobalStore((state) => state.openNetworkModal);
  const selectedNetwork = useGlobalStore((state) => state.selectedNetwork);
  const user = useAuthStore((state) => state.user);
  const points = user?.Points;

  const [txReceiptOpen, setTxReceiptOpen] = useState(false);
  const [isPreviewAndConfirmOpen, setIsPreviewAndConfirmOpen] = useState(false);
  const [pointsError, setPointsError] = useState("");
  const [receiptType, setReceiptType] = useState<"success" | "fail">("success");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm<WithdrawFormValues>({ resolver: yupResolver(Schema) });

  useEffect(() => {
    if (selectedNetwork) {
      NETWORK_TO_NAME_MAP[selectedNetwork] &&
        setValue("selectedNetwork", NETWORK_TO_NAME_MAP[selectedNetwork]);
    }
  }, [selectedNetwork]);

  const onSubmit = (data: WithdrawFormValues) => {
    if (+points && +points < +data.amount) {
      setPointsError(t("insufficient balance"));
    } else {
      setPointsError("");
      setIsPreviewAndConfirmOpen(true);
    }
  };
  const amountWatch = watch("amount");
  console.log("amountWatch", amountWatch);

  useEffect(() => {
    if (amountWatch > points) {
      setPointsError(t("insufficient balance"));
    } else {
      setPointsError("");
    }
  }, [amountWatch, points]);

  return (
    <SidebarPageWrapper
      isOpen={isWithdrawModalOpen}
      onClose={closeWithdrawModal}
    >
      <CustomTopbar
        text={t("withdraw")}
        showLeftIcon
        leftIconOnClick={closeWithdrawModal}
      />
      <form
        className="flex flex-col justify-between flex-1 px-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <InputWithLabel<WithdrawFormValues>
            id="networkAddress"
            label={"USDT 網路地址"}
            placeholder=""
            type="text"
            register={register}
            errors={errors}
          />

          <InputWithLabel<WithdrawFormValues>
            id="selectedNetwork"
            label={t("withdrawal-network")}
            placeholder={t("select-network")}
            type="text"
            register={register}
            errors={errors}
            inputProps={{
              onClick: openNetworkModal,
              value: NETWORK_TO_NAME_MAP[selectedNetwork],
              onChange: openNetworkModal,
            }}
          />

          <InputWithLabel<WithdrawFormValues>
            id="amount"
            label={t("withdrawal-amount")}
            placeholder=""
            type="text"
            endIcon={
              <p className="text-Neutral-n700 font-poppins text-sm font-medium leading-5.5 tracking-[0.14px] gap-2 flex">
                USDT
                <span
                  className="text-dark-sky-blue border-l pl-2 border-Neutral-n700"
                  onClick={() => setValue("amount", user?.Points)}
                >
                  全部
                </span>
              </p>
            }
            register={register}
            errors={errors}
          />
          {pointsError && (
            <p className="text-Supporting-color-Error text-sm font-poppins mt-1">
              {pointsError}
            </p>
          )}
        </div>
        <CustomButton
          text={t("withdraw")}
          className="!text-2xl !font-semibold h-[60px] !rounded-[20px] mb-13.5"
          isDisabled={Object.keys(errors).length > 0 || pointsError?.length > 0}
          type="submit"
        />
      </form>
      <PreviewAndConfirm
        amount={+getValues("amount")}
        isOpen={isPreviewAndConfirmOpen}
        onClose={() => setIsPreviewAndConfirmOpen(false)}
        onConfirm={(res) => {
          setIsPreviewAndConfirmOpen(false);
          if (res) setReceiptType("success");
          else setReceiptType("fail");
          setTxReceiptOpen(true);
        }}
        walletAddress={getValues("networkAddress")}
        network={getValues("selectedNetwork")}
      />
      <TxReceipt
        heading={receiptType === "success" ? "提幣成功" : "提幣失敗"}
        amount={+getValues("amount")}
        isOpen={txReceiptOpen}
        receiptType={"success"}
        onClose={() => setTxReceiptOpen(false)}
        finishBtnText={t("completed")}
        walletAddress={getValues("networkAddress")}
        network={getValues("selectedNetwork")}
        finishBtnOnClick={() => {
          setTxReceiptOpen(false);
          closeWithdrawModal();
          setValue("networkAddress", "");
          setValue("amount", "");
        }}
      />
    </SidebarPageWrapper>
  );
};

export default Withdraw;
