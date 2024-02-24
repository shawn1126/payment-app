import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import classNames from "classnames";
import { t } from "i18next";
import { QRCodeSVG } from "qrcode.react";
import { CoinsOptions } from "utils/constants";
import * as yup from "yup";

import {
  CustomButton,
  //  Divider,
  InputWithLabel,
} from "components/generic";

import PayoutStatus from "./PayoutStatus";

const Schema = yup
  .object({
    tokenValue: yup
      .number()
      .typeError("amount must be a number")
      .min(0, t("amount-must-be-greater-than-0")),
  })
  .required();

export type CollectionValues = yup.InferType<typeof Schema>;

type PayoutDetailProps = {
  internal?: boolean;
  qrValue?: string;
  selectedNetwork?: string;
  externalWalletAddress?: string;
  setSelectedNetwork?: React.Dispatch<React.SetStateAction<string>>;
  setEnteredAmountInUsdt?: React.Dispatch<React.SetStateAction<number>>;
};
const PayoutDetail = ({
  internal,
  qrValue,
  selectedNetwork,
  externalWalletAddress,
  setSelectedNetwork,
  setEnteredAmountInUsdt,
}: PayoutDetailProps) => {
  const [twdEquivalentTo1Usdt, setTwdEquivalentTo1Usdt] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {
    register,
    formState: { errors },
    watch,
  } = useForm<CollectionValues>({ resolver: yupResolver(Schema) });

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/simple/price", {
        params: {
          ids: "tether",
          vs_currencies: "twd",
        },
      })
      .then((res) => {
        console.log(res.data.tether.twd);
        setTwdEquivalentTo1Usdt(res.data.tether.twd);
      });
  }, []);

  const tokenValue = watch("tokenValue");

  useEffect(() => {
    if (tokenValue) {
      setEnteredAmountInUsdt(tokenValue);
    }
  }, [tokenValue]);

  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCoinSelect = (selectedCoin) => {
    setSelectedNetwork(selectedCoin);
    setIsMenuOpen(false);
  };

  return (
    <div className="pt-8">
      {!internal && (
        <div className="px-5 flex flex-col gap-[6px] pb-5">
          <h2 className="text-Neutral-n800 text-sm font-poppins font-normal leading-[18px] tracking-[0.14px]">
            充幣網路
          </h2>

          <div className="w-full relative">
            <button
              type="button"
              className={`w-full flex justify-between items-center border-Neutral-n200 border-1.5 rounded-lg py-2.5 px-[18px] text-Neutral-n600 font-normal font-poppins text-sm leading-4.5 ${
                isMenuOpen ? "border-b-0 rounded-b-none" : ""
              }`}
              onClick={handleToggle}
            >
              {selectedNetwork ? selectedNetwork : "請選擇主網"}
              {isMenuOpen ? (
                <img src="/assets/icons/chevron-up-s.svg" alt="Open" />
              ) : (
                <img src="/assets/icons/fi_chevron-down.svg" alt="Close" />
              )}
            </button>
            {isMenuOpen && (
              <div className="border-Neutral-n200 border-b-1.5 border-l-1.5 border-r-1.5 rounded-b-lg overflow-hidden absolute top-0.5 bg-milk-white z-10 w-full rounded-t-md">
                {CoinsOptions.map((option, index) => {
                  return (
                    <p
                      key={index}
                      className="py-3 text-Neutral-n600 text-[15px] font-normal leading-[18px] font-nunito hover:bg-Neutral-n200 px-6"
                      onClick={() => handleCoinSelect(option.coin)}
                    >
                      {option.coin}
                    </p>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {internal && (
        <p className="text-center text-dark-grey text-sm font-medium mb-[46px]">
          其他人可以使用 <b>PAYPAY APP</b> 掃描以付款
        </p>
      )}

      <div
        className={classNames("flex justify-center items-center", {
          "mt-1": !internal,
        })}
      >
        {qrValue && (
          <QRCodeSVG value={qrValue} width={160} height={160} id="qrCode" />
        )}
      </div>

      <div className="flex flex-col pt-[25px] px-5 pb-[30px] gap-3 items-center flex-1 w-full">
        {!internal && (
          <div className="w-full">
            <p className="text-sm text-Neutral-n400 mb-1.5">充幣地址</p>
            <div className="flex justify-between gap-2">
              <p className="max-w-full overflow-hidden break-all text-sm font-medium">
                {externalWalletAddress}
              </p>

              <img
                src="/assets/icons/Copy_alt_light.png"
                className="w-6 h-6 active:opacity-50 cursor-pointer"
                width="24"
                height="24"
                alt="copy"
                onClick={() => {
                  navigator.clipboard.writeText(externalWalletAddress);
                }}
              />
            </div>
          </div>
        )}

        <InputWithLabel<CollectionValues>
          componentClassName="!w-full !mb-0"
          labelClassName="!text-Neutral-n400"
          id={"tokenValue"}
          label={"接收金額"}
          type="text"
          register={register}
          errors={errors}
          inputClassName="h-[46px]"
          endIcon={
            <p className="text-Neutral-n700 font-poppins text-sm font-medium leading-5.5 tracking-[0.14px]">
              NTD
            </p>
          }
        />
        <p className="text-left w-full text-Neutral-n700 text-sm">
          ≈{" "}
          {twdEquivalentTo1Usdt
            ? (tokenValue / twdEquivalentTo1Usdt).toFixed(2)
            : 0}
          USTD
        </p>

        <CustomButton
          text="確認"
          className="h-[60px] !rounded-[20px] text-[26px] font-semibold mt-[18px]"
        />
      </div>

      <PayoutStatus />
    </div>
  );
};

export default PayoutDetail;
