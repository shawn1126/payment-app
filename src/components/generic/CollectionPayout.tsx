import React, { useState } from "react";
// import Tab from "@mui/joy/Tab";
// import TabList from "@mui/joy/TabList";
// import TabPanel from "@mui/joy/TabPanel";
// import Tabs from "@mui/joy/Tabs";
import classNames from "classnames";

import { ResultDisplay } from "components/generic";
interface CollectionPayoutIProps {
  isMiddleTab: boolean;
  firstTabText: string;
  secondTabText?: string;
  middleTabText?: string;
  firstTabChildren?: React.ReactNode;
  secondTabChildren?: React.ReactNode;
  middleTabChildren?: React.ReactNode;
  isOpenCollectionModal: boolean;
  closeCollectionModal: () => void;
}

const CollectionPayout = (props: CollectionPayoutIProps) => {
  const {
    isMiddleTab = false,
    firstTabText,
    secondTabText,
    middleTabText,
    firstTabChildren,
    secondTabChildren,
    middleTabChildren,
    isOpenCollectionModal,
    closeCollectionModal,
  } = props;

  const [activeTab, setActiveTab] = useState(1);
  return (
    <ResultDisplay
      isOpen={isOpenCollectionModal}
      onClose={closeCollectionModal}
      showMainBtn={false}
      topBarProps={{
        showLeftIcon: true,
        leftIconOnClick: closeCollectionModal,
      }}
    >
      <div className="bg-Neutral-n200 w-full rounded-tl-[20px] rounded-tr-[20px] flex">
        <div
          className={classNames("flex-1 items-center justify-center flex", {
            "bg-Shade-White rounded-tl-[20px] rounded-tr-[10px]":
              activeTab === 1,
          })}
          onClick={() => setActiveTab(1)}
        >
          <p className="font-poppins text-sm font-medium my-2">
            {firstTabText}
          </p>
        </div>
        {isMiddleTab && (
          <div
            className={classNames("flex-1 items-center justify-center flex", {
              "bg-Shade-White rounded-tl-[10px] rounded-tr-[10px]":
                activeTab === 2,
            })}
            onClick={() => setActiveTab(2)}
          >
            <p className="font-poppins text-sm font-medium my-2">
              {middleTabText}
            </p>
          </div>
        )}
        <div
          className={classNames("flex-1 items-center justify-center flex", {
            "bg-Shade-White rounded-tl-[10px] rounded-tr-[20px]":
              activeTab === 3,
          })}
          onClick={() => setActiveTab(3)}
        >
          <p className="font-poppins text-sm font-medium my-2">
            {secondTabText}
          </p>
        </div>
      </div>
      {activeTab === 1 && <>{firstTabChildren}</>}
      {activeTab === 2 && <>{middleTabChildren}</>}
      {activeTab === 3 && <>{secondTabChildren}</>}
    </ResultDisplay>
  );
};

export default CollectionPayout;
