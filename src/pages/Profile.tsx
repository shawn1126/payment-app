import { useState } from "react";
import { useTranslation } from "react-i18next";
// import { t } from "i18next";
import { useAuthStore } from "store/authStore";

import {
  CustomCardWithVariants,
  CustomerCareModal,
  DualLineInfoBar,
} from "components/generic";

const Profile = () => {
  const { t } = useTranslation();
  const [showBalance, setShowBalance] = useState(true);
  const [isCustomerCareModalOpen, setIsCustomerCareModalOpen] = useState(false);

  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const setUserEmailAndUid = useAuthStore((state) => state.setUserEmailAndUid);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    setUser(null);
    setUserEmailAndUid(null);
  };

  const openForgetPassword1 = useAuthStore(
    (state) => state.openForgetPassword1,
  );
  const openUpdateUserName = useAuthStore((state) => state.openUpdateUserName);
  const openUpdateUserEmail = useAuthStore(
    (state) => state.openUpdateUserEmail,
  );
  const openPaymentCodeStep1 = useAuthStore(
    (state) => state.openPaymentCodeStep1,
  );
  const openUpdateUserPhoneNo = useAuthStore(
    (state) => state.openUpdateUserPhoneNo,
  );
  const openLanguageModal = useAuthStore((state) => state.openLanguageModal);

  console.log("userin profile page", user);
  return (
    <div className="bg-milk-white w-full font-poppins min-h-screen pb-[61px] pt-2">
      <div className="px-4">
        <CustomCardWithVariants
          isProfile={true}
          username={user?.UserName}
          UID={user?.UUID}
          showBalance={showBalance}
          setShowBalance={setShowBalance}
          balanceAmount={user?.Points || 0}
        />
      </div>
      <div className="px-5 flex flex-col gap-3 mt-5">
        <DualLineInfoBar
          label={t("security-center")}
          value={t("change-nickname")}
          icon="/assets/icons/fi_edit.svg"
          valueClassName="!text-sm font-medium"
          labelClasName="font-normal text-sm"
          iconStart
          borderB
          onBarClick={openUpdateUserName}
        />
        <DualLineInfoBar
          value={t("change-password")}
          icon="/assets/icons/fi_key.svg"
          valueClassName="!text-sm font-medium"
          labelClasName="font-normal text-sm"
          iconStart
          borderB
          onBarClick={openForgetPassword1}
        />
        <DualLineInfoBar
          value={t("change-email")}
          icon="/assets/icons/fi_mail.svg"
          valueClassName="text-sm font-medium"
          labelClasName="font-normal text-sm"
          iconStart
          borderB
          onBarClick={openUpdateUserEmail}
        />
        <DualLineInfoBar
          value={t("change-phone-number")}
          icon="/assets/icons/fi_phone.svg"
          valueClassName="text-sm font-medium"
          labelClasName="font-normal text-sm"
          iconStart
          borderB
          onBarClick={openUpdateUserPhoneNo}
        />
        <DualLineInfoBar
          value={t("change-payment-password")}
          icon="/assets/icons/fi_credit-card.svg"
          valueClassName="text-sm font-medium"
          labelClasName="font-normal text-sm"
          iconStart
          borderB
          onBarClick={openPaymentCodeStep1}
        />
        <DualLineInfoBar
          label={t("personal-profile-settings")}
          value={t("language")}
          icon="/assets/icons/fi_globe.svg"
          valueClassName="text-sm font-medium"
          labelClasName="font-normal text-sm"
          iconStart
          borderB
          onBarClick={openLanguageModal}
        />
        <DualLineInfoBar
          label={t("help-center")}
          value={t("contact-customer-service")}
          icon="/assets/icons/fi_message-square.svg"
          valueClassName="text-sm font-medium"
          labelClasName="font-normal text-sm"
          iconStart
          borderB
          onBarClick={() => setIsCustomerCareModalOpen(true)}
        />
        <div className="pt-[99px] pb-[61px]">
          <p className="text-sm underline font-medium" onClick={logoutHandler}>
            {t("log-out")}
          </p>
        </div>
      </div>
      <CustomerCareModal
        showPopUp={isCustomerCareModalOpen}
        closePopUp={() => setIsCustomerCareModalOpen(false)}
      />
    </div>
  );
};

export default Profile;
