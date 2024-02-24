import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import detector from "i18next-browser-languagedetector";

import enJSON from "./locale/en.json";
import zhCNJSON from "./locale/zh-CN.json";
import zhTWJSON from "./locale/zh-TW.json";

const resources = {
  繁體中文: { ...zhTWJSON },
  简体中文: { ...zhCNJSON },
  English: { ...enJSON },
};

i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: "en", // use en if detected lng is not available

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });