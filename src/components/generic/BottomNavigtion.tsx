import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useGlobalStore } from "store/globalStore";
import GlobalModalsWrapper from "utils/GlobalModalsWrapper";

const BottomNavigtion = () => {
  const { t } = useTranslation();

  const setqrScannerDetails = useGlobalStore(
    (state) => state.setqrScannerDetails,
  );

  const [active, setActive] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/home") {
      setActive(1);
    }
    if (location.pathname === "/transaction") {
      setActive(2);
    }
    if (location.pathname === "/contact") {
      setActive(3);
    }
    if (location.pathname === "/profile") {
      setActive(4);
    }
  }, [location]);

  return (
    <>
      <div className="h-16 pt-2 px-4 fixed bottom-0 left-0 right-0 flex justify-between bg-milk-white">
        <div className="flex gap-[13px]">
          <div
            className="w-14 h-11 flex flex-col justify-between items-center"
            onClick={() => navigate("/home")}
          >
            {active === 1 ? (
              <img
                src="/assets/icons/home-active.svg"
                alt="home"
                width={20}
                height={20}
              />
            ) : (
              <img
                src="/assets/icons/home-inactive.svg"
                alt="home"
                width={20}
                height={20}
              />
            )}
            <p
              className={classNames(
                "text-Neutral-n600 text-center font-poppins text-xs leading-4 tracking-[0.1px]",
                {
                  "text-dark-sky-blue": active === 1,
                },
              )}
            >
              PAYPAY
            </p>
          </div>
          <div
            className="w-14 h-11 flex flex-col justify-between items-center"
            onClick={() => navigate("/transaction")}
          >
            {active === 2 ? (
              <img
                src="/assets/icons/tx-active.svg"
                alt="transaction"
                width={20}
                height={20}
              />
            ) : (
              <img
                src="/assets/icons/tx-inactive.svg"
                alt="transaction"
                width={20}
                height={20}
              />
            )}
            <p
              className={classNames(
                "text-Neutral-n600 text-center font-poppins text-xs leading-4 tracking-[0.1px]",
                {
                  "text-dark-sky-blue": active === 2,
                },
              )}
            >
              {t("history")}
            </p>
          </div>
        </div>
        <div
          className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rotate-45 p-2 flex items-center justify-center rounded-xl bg-nav-blue-gradient bottom-10 active:opacity-90 active:translate-y-0.5 active:shadow-md"
          onClick={() => {
            setqrScannerDetails({ open: true, type: "directTransfer" });
          }}
        >
          <img
            src="/assets/icons/qr.svg"
            alt="plus"
            width={24}
            height={24}
            className="-rotate-45"
          />
        </div>
        <div className="flex gap-[13px]">
          <div
            className="w-14 h-11 flex flex-col justify-between items-center"
            onClick={() => navigate("/contact")}
          >
            {active === 3 ? (
              <img
                src="/assets/icons/contact-active.svg"
                alt="contact"
                width={20}
                height={20}
              />
            ) : (
              <img
                src="/assets/icons/contact-inactive.svg"
                alt="contact"
                width={20}
                height={20}
              />
            )}
            <p
              className={classNames(
                "text-Neutral-n600 text-center font-poppins text-xs leading-4 tracking-[0.1px]",
                {
                  "text-dark-sky-blue": active === 3,
                },
              )}
            >
              {t("contacts")}
            </p>
          </div>
          <div
            className="w-14 h-11 flex flex-col justify-between items-center"
            onClick={() => navigate("/profile")}
          >
            {active === 4 ? (
              <img
                src="/assets/icons/profile-active.svg"
                alt="profile"
                width={20}
                height={20}
              />
            ) : (
              <img
                src="/assets/icons/profile-inactive.svg"
                alt="profile"
                width={20}
                height={20}
              />
            )}
            <p
              className={classNames(
                "text-Neutral-n600 text-center font-poppins text-xs leading-4 tracking-[0.1px]",
                {
                  "text-dark-sky-blue": active === 4,
                },
              )}
            >
              {t("account")}
            </p>
          </div>
        </div>
      </div>
      <GlobalModalsWrapper />
    </>
  );
};

export default BottomNavigtion;
