import React from "react";
import classNames from "classnames";

import CustomButton from "./CustomButton";
import CustomTopbar, { CustomTopbarIProps } from "./CustomTopbar";
import SidebarPageWrapper, {
  SidebarPageWrapperIProps,
} from "./SidebarPageWrapper";

interface ResultDisplayIProps extends SidebarPageWrapperIProps {
  children: React.ReactNode;
  finishBtnText?: string;
  finishBtnOnClick?: () => void;
  showTextBtn?: boolean;
  textBtnText?: string;
  textBtnOnClick?: () => void;
  topBarProps?: CustomTopbarIProps;
  showMainBtn?: boolean;
}
function ResultDisplay({
  children,
  isOpen,
  onClose,
  finishBtnText,
  finishBtnOnClick,
  showTextBtn,
  textBtnText,
  textBtnOnClick,
  topBarProps,
  showMainBtn = true,
}: ResultDisplayIProps) {
  return (
    <SidebarPageWrapper isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col flex-1 bg-milk-white">
        <div className="h-[39vh] w-full bg-dark-blue-gradient absolute top-0 left-0 right-0 z-[2]"></div>
        <CustomTopbar
          componentClassName="mb-7 z-10 relative"
          showLeftIcon={false}
          {...topBarProps}
        />
        <div className="mx-5 flex-1 justify-between flex flex-col relative z-10">
          <div className="flex">
            <div className="contentCard rounded-[20px] bg-Shade-White w-full flex-1 flex flex-col shadow-md">
              {children}
            </div>
          </div>
          <div
            className={classNames("relative", {
              "pb-[54px]": !showMainBtn,
              "pb-8": showTextBtn,
            })}
          >
            {showMainBtn && (
              <CustomButton
                text={finishBtnText}
                className="mt-[54px] h-[60px] !text-2xl !font-semibold !rounded-[20px] mb-4"
                onClick={finishBtnOnClick}
              />
            )}
            {showTextBtn && (
              <p
                className="text-Neutral-n700 font-poppins text-base font-bold underline text-center mt-5"
                onClick={textBtnOnClick}
              >
                {textBtnText}
              </p>
            )}
          </div>
        </div>
      </div>
    </SidebarPageWrapper>
  );
}

export default ResultDisplay;
