import { useTranslation } from "react-i18next";
import { FriendOutputType } from "api/apiTypes";
import { useAddContactStore } from "store/addContactStore";
import { useAuthStore } from "store/authStore";
import { useGlobalStore } from "store/globalStore";
import { maskUUID } from "utils/functions";

import { CustomTopbar } from "components/generic";

const ContactList = () => {
  const userData = useAuthStore((state) => state.user);
  const friends = userData?.friends;
  const { t } = useTranslation();

  const closeContactListDrawer = useGlobalStore(
    (state) => state.closeContactListDrawer,
  );

  const setSelectedContact = useGlobalStore(
    (state) => state.setSelectedContact,
  );

  const setqrScannerDetails = useGlobalStore(
    (state) => state.setqrScannerDetails,
  );

  const openAddFriendModal = useAddContactStore(
    (state) => state.openAddFriendModal,
  );
  return (
    <div className="bg-Shade-White flex-1 flex flex-col pt-16 h-[100vh]">
      <CustomTopbar
        showLeftIcon={false}
        text={t("frequent-contacts")}
        showRightIcon
        rightIcon="/assets/icons/plus.svg"
        rightIconOnClick={() => {
          setqrScannerDetails({ open: true, type: "addFriend" });
          openAddFriendModal(); ///if remove this then modal does not open
        }}
        componentClassName="fixed top-0 w-full z-10 bg-Shade-White"
      />
      <div className="flex bg-Shade-White px-5 flex-1 h-[100vh]">
        <div className="flex flex-col items-start gap-6 flex-1 w-full h-[100vh]">
          {friends?.map(({ name, uuid }: FriendOutputType) => {
            return (
              <div
                key={uuid}
                className="flex gap-5"
                onClick={() => {
                  setSelectedContact({
                    uid: uuid.toString(),
                    img: "/assets/images/home/user.svg",
                  });
                  closeContactListDrawer();
                }}
              >
                <div className="items-center flex">
                  <img
                    src={"/assets/images/home/user.svg"}
                    width="60"
                    height="60"
                  />
                </div>
                <div className="flex flex-col flex-1 w-full gap-1 justify-center">
                  <h1 className="font-urbanist text-lg text-Neutral-n700 font-bold leading-[120%]">
                    {name}
                  </h1>
                  <span className="font-urbanist text-Neutral-n400 text-base font-medium leading-[22.4px] tracking-[0.2px]">
                    PAYPAY ID : {maskUUID(uuid)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContactList;
