import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { useAuthStore } from "store/authStore";
import { useGlobalStore } from "store/globalStore";
import { useHomeStore } from "store/homeStore";
import { useTransferStore } from "store/transferStore";
import { maskUUID } from "utils/functions";

import {
  CustomButton,
  CustomTopbar,
  EnterPaymentPassword,
  SidebarPageWrapper,
} from "components/generic";

import AmountModal from "./AmountModal";
import ConfirmTransferModal from "./ConfirmTransferModal";
import TransferReceiptDetails from "./TransferReceiptDetails";

const SendToken = () => {
  const { t } = useTranslation();
  const uuid = useAuthStore((state) => state.user?.UUID);
  const userPoints = useAuthStore((state) => state.user?.Points);
  const [transactionResult, setTransactionResult] = useState<
    "success" | "fail" | null
  >(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [enteredPassCode, setEnteredPassCode] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [activeTab, setActiveTab] = useState(0);
  const [enteredText, setEnteredText] = useState<string>("");
  const [eneteredAmount, setEnteredAmount] = useState<number>(0);
  const [isAmountModalOpen, setIsAmountModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState({
    name: "",
    uuid: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [searchedUsers, setSearchedUsers] = useState([]);
  const [attemptsCount, setAttemptsCount] = useState(0);

  const setIsRequirePaymentPassResetModalOpen = useGlobalStore(
    (state) => state.setIsRequirePaymentPassResetModalOpen,
  );

  const isSendTokenModalOpen = useHomeStore(
    (state) => state.isSendTokenModalOpen,
  );
  const closeSendTokenModal = useHomeStore(
    (state) => state.closeSendTokenModal,
  );
  const scannedQr = useGlobalStore((state) => state.scannedQr);
  const setScannedQr = useGlobalStore((state) => state.setScannedQr);
  const searchContact = useTransferStore((state) => state.searchContact);

  const friends = useAuthStore((state) => state?.user?.friends);
  const isLoading = useGlobalStore((state) => state.isLoading);

  const showPasswordErrorHandler = () => {
    setPasswordError("incorrect payment password");
    setAttemptsCount(attemptsCount + 1);
    if (attemptsCount === 4) {
      setIsRequirePaymentPassResetModalOpen(true);
      setPasswordModalOpen(false);
      setEnteredPassCode("");
      setAttemptsCount(0);
    }
    setTimeout(() => {
      setPasswordError("");
    }, 3000);
  };

  const transferPoints = useTransferStore((store) => store.transferPoints);

  const transactionSendHandler = async () => {
    const res = await transferPoints({
      amount_points: eneteredAmount.toString(),
      from_uuid: uuid,
      to_uuid: selectedContact.uuid,
      paymentpassword: enteredPassCode,
    });
    console.log("___res", res);
    if (res === "success") {
      setTransactionResult("success");
      setEnteredPassCode("");
      setPasswordModalOpen(false);
    } else if (res === "error") {
      showPasswordErrorHandler();
      setTransactionResult("fail");
      setPasswordModalOpen(false);
      setEnteredPassCode("");
    } else if (res === "payment_password_error") {
      showPasswordErrorHandler();
    }
  };

  useEffect(() => {
    if (scannedQr.uid !== "" && isSendTokenModalOpen) {
      setSelectedContact({
        name: scannedQr.name,
        uuid: scannedQr.uid,
      });
      setEnteredAmount(+scannedQr.amount);
      if (+scannedQr.amount === 0) setIsAmountModalOpen(true);
      else setShowConfirmationModal(true);

      setScannedQr({
        name: "",
        uid: "",
        amount: null,
        network: "ethereum",
        qrType: "directTransfer",
        transferType: "internal",
      });
    }
  }, [scannedQr.amount, scannedQr.uid, scannedQr.name, isSendTokenModalOpen]);

  useEffect(() => {
    // if 5 characters or more are entered, search for users using search api
    // only if user has stopped typing for 2 second
    // if character is typed within 2 seconds, clear the timeout and start again

    if (
      activeTab === 0 &&
      !enteredText.includes("@") &&
      enteredText.length > 0
    ) {
      setErrorMessage("Invalid email");
      return;
    } else if (
      activeTab === 1 &&
      enteredText.length !== 10 &&
      enteredText.length > 0
    ) {
      setErrorMessage("Invalid phone number");
      return;
    } else if (
      activeTab === 2 &&
      enteredText.length < 5 &&
      enteredText.length > 0
    ) {
      setErrorMessage("Invalid PAYPAY ID");
      return;
    } else setErrorMessage("");

    if (enteredText.length === 0) return;

    const timeout = setTimeout(() => {
      const searchedUser = [];
      if (activeTab === 0) {
        searchContact({
          email: enteredText,
          phone: "",
          uid: "",
        }).then((res) => setSearchedUsers(res));
      } else if (activeTab === 1) {
        searchContact({
          email: "",
          phone: enteredText,
          uid: "",
        }).then((res) => setSearchedUsers(res));
      } else if (activeTab === 2) {
        searchContact({
          email: "",
          phone: "",
          uid: enteredText,
        }).then((res) => setSearchedUsers(res));
      }
      setSearchedUsers(searchedUser);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [enteredText, activeTab]);

  let contactsToMap = [];
  if (enteredText?.length === 0 && friends?.length > 0) {
    contactsToMap = friends;
  } else if (enteredText?.length > 0 && searchedUsers?.length > 0) {
    contactsToMap = searchedUsers.map((user) => {
      return {
        name: user.UserName,
        uuid: user.UUID,
      };
    });
  } else if (enteredText?.length > 0 && searchedUsers?.length === 0) {
    contactsToMap = [];
  } else if (enteredText?.length === 0 && friends?.length === 0) {
    contactsToMap = [];
  }

  const txHistory = useTransferStore((state) => state.txHistory);
  const sentTx = txHistory
    .filter((tx) => tx.Type === "TransferOut")
    .sort((a, b) => +b.Timestamp - +a.Timestamp);
  const latestTx = sentTx[0];

  return (
    <SidebarPageWrapper
      isOpen={isSendTokenModalOpen}
      onClose={() => {
        closeSendTokenModal();
        setSelectedContact({
          name: "",
          uuid: "",
        });
        setEnteredAmount(0);
      }}
    >
      <CustomTopbar
        text={t("transfer")}
        leftIconOnClick={() => {
          closeSendTokenModal();
          setSelectedContact({
            name: "",
            uuid: "",
          });
          setEnteredAmount(0);
        }}
      />
      <div className="px-5">
        <p className="text-sm text-Neutral-n400">收款人</p>
        <div className="flex gap-5.5 text-sm text-Neutral-n700 my-1.5">
          <p
            className={classNames("px-[5px] py-0.5 rounded-[6px]", {
              "text-dark-sky-blue bg-Neutral-n200": activeTab === 0,
            })}
            onClick={() => setActiveTab(0)}
          >
            信箱
          </p>
          <p
            className={classNames("px-[5px] py-0.5 rounded-[6px]", {
              "text-dark-sky-blue bg-Neutral-n200": activeTab === 1,
            })}
            onClick={() => setActiveTab(1)}
          >
            手機號碼
          </p>
          <p
            className={classNames("px-[5px] py-0.5 rounded-[6px]", {
              "text-dark-sky-blue bg-Neutral-n200": activeTab === 2,
            })}
            onClick={() => setActiveTab(2)}
          >
            PAYPAY ID
          </p>
        </div>
        <div className="mb-[30px]">
          <input
            className="w-full h-[46px] border border-Neutral-n200 rounded-[8px] px-5"
            value={enteredText}
            onChange={(e) => setEnteredText(e.target.value)}
          />
          {errorMessage && (
            <p className="text-sm text-Supporting-color-Error mb-4">
              {errorMessage}
            </p>
          )}
        </div>
        <p className="text-sm text-Neutral-n400">常用聯絡人</p>
        <div className="h-[52vh] overflow-y-scroll">
          {enteredText?.length > 0 &&
            searchedUsers?.length === 0 &&
            !isLoading && (
              <p className="text-sm text-Neutral-n400">No results found</p>
            )}

          {isLoading && <p className="text-sm text-Neutral-n400">Loading...</p>}

          {contactsToMap?.map((contact) => {
            return (
              <div
                key={contact.uuid + Math.random()}
                className="flex gap-5 mb-6"
                onClick={() => {
                  setSelectedContact({
                    name: contact.name,
                    uuid: contact.uuid,
                  });
                  setIsAmountModalOpen(true);
                }}
              >
                <div className="items-center flex">
                  <img
                    src={"/assets/images/home/user.svg"}
                    width="60"
                    height="60"
                  />
                </div>
                <div className="flex flex-col gap-1 justify-center">
                  <h1 className="font-urbanist text-lg text-Neutral-n700 font-bold leading-[120%]">
                    {contact.name}
                  </h1>
                  <span className="font-urbanist text-Neutral-n400 text-base font-medium leading-[22.4px] tracking-[0.2px]">
                    PAYPAY ID : {maskUUID(contact.uuid)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="p-5">
        <CustomButton
          text={"繼續"}
          className="h-[60px] mb-13.5 !font-semibold !text-2xl !rounded-[20px]"
          type="submit"
          isDisabled={enteredText.length < 5}
          onClick={() => setIsAmountModalOpen(true)}
        />
      </div>

      <ConfirmTransferModal
        amount={eneteredAmount}
        closeModal={() => setShowConfirmationModal(false)}
        onConfirm={() => {
          setShowConfirmationModal(false);
          setPasswordModalOpen(true);
        }}
        open={showConfirmationModal}
        name={selectedContact.name}
        transferType="internal"
        uid={selectedContact.uuid}
      />

      <EnterPaymentPassword
        open={passwordModalOpen}
        closeModal={() => setPasswordModalOpen(false)}
        value={enteredPassCode}
        setValue={setEnteredPassCode}
        onConfirm={transactionSendHandler}
        error={passwordError}
      />

      <TransferReceiptDetails
        isOpen={transactionResult !== null}
        receiptType={transactionResult || "success"}
        onClose={() => setTransactionResult(null)}
        finishBtnText={t("completed")}
        finishBtnOnClick={() => {
          setTransactionResult(null);
          closeSendTokenModal();
          setEnteredAmount(0);
        }}
        showTextBtn={true}
        textBtnText={t("continue-transfer")}
        textBtnOnClick={() => {
          setTransactionResult(null);
          setEnteredAmount(0);
        }}
        receiverUID={selectedContact.uuid}
        amount={eneteredAmount.toString()}
        time={latestTx?.Timestamp}
        txId={latestTx?.Txid}
        type={latestTx?.Type}
      />
      <AmountModal
        amount={eneteredAmount}
        closeModal={() => setIsAmountModalOpen(false)}
        open={isAmountModalOpen}
        setAmount={setEnteredAmount}
        onSubmit={() => {
          setIsAmountModalOpen(false);
          setShowConfirmationModal(true);
        }}
        userPoints={+userPoints}
      />
    </SidebarPageWrapper>
  );
};

export default SendToken;
