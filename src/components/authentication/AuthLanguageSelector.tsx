import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "store/authStore";

import { CustomButton, SidebarPageWrapper } from "components/generic";

const AuthLanguageSelector = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();

  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLanguageSelect = (selectedLanguageKey) => {
    changeLanguage(selectedLanguageKey);
    setIsMenuOpen(false);
  };
  const { isLanguageModalOpen, openLanguageModal, closeLanguageModal } =
    useAuthStore();

  console.log("isLanguageModalOpen", isLanguageModalOpen);

  const isWrongLang =
    !language ||
    (language !== "繁體中文" &&
      language !== "简体中文" &&
      language !== "English");

  useEffect(() => {
    openLanguageModal();
  }, []);

  const btnClickHandler = () => {
    if (isWrongLang) {
      return;
    }
    closeLanguageModal();
  };

  return (
    <SidebarPageWrapper
      isOpen={isLanguageModalOpen}
      onClose={closeLanguageModal}
    >
      <div className="w-full p-5 flex flex-col justify-center items-center ">
        <h2 className="mt-[120px] text-Neutral-n800 font-bold leading-8.5 font-poppins text-3xl">
          {isWrongLang ? "Choose Language" : t("chooseLanguage")}
        </h2>
        <div className="pt-11 w-full h-56 ">
          <button
            type="button"
            className={`w-full flex justify-between items-center border-Neutral-n200 border-1.5 rounded-lg py-3 px-[18px] text-Neutral-n600 font-normal font-poppins text-sm leading ${
              isMenuOpen ? "border-b-0 rounded-b-none" : ""
            }`}
            onClick={handleToggle}
          >
            {language}
            {isMenuOpen ? (
              <img src="/assets/icons/chevron-up-s.svg" alt="Open" />
            ) : (
              <img src="/assets/icons/fi_chevron-down.svg" alt="Close" />
            )}
          </button>
          {isMenuOpen && (
            <div className="border-Neutral-n200 border-b-1.5 border-l-1.5 border-r-1.5 rounded-b-lg overflow-hidden ">
              {languageOptions.map((option) => {
                return (
                  <p
                    key={option.id}
                    className="py-3 text-Neutral-n600 text-[15px] font-normal leading-[18px] font-nunito hover:bg-Neutral-n200 px-6"
                    onClick={() => handleLanguageSelect(option.text)}
                  >
                    {option.text}
                  </p>
                );
              })}
            </div>
          )}
        </div>

        <CustomButton
          text={t("next")}
          variant="info"
          className="h-12.5 mt-[71px] !font-medium"
          onClick={!isWrongLang && btnClickHandler}
          isDisabled={isWrongLang}
        />
      </div>
    </SidebarPageWrapper>
  );
};

export default AuthLanguageSelector;

const languageOptions = [
  { id: "lang1", text: "繁體中文", key: "zh-TW" },
  { id: "lang2", text: "简体中文", key: "zh-CN" },
  { id: "lang3", text: "English", key: "en" },
];
