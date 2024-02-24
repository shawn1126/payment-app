import { useEffect, useState } from "react";
import { t } from "i18next";
import { useAddContactStore } from "store/addContactStore";
import { useGlobalStore } from "store/globalStore";
import { maskUUID } from "utils/functions";

import {
  CustomButton,
  CustomTopbar,
  SidebarPageWrapper,
} from "components/generic";

const AddNewContact = ({ open }: { open?: boolean }) => {
  const addNewFriend = useAddContactStore((state) => state.addNewFriend);
  const addNewContacts = useAddContactStore((state) => state.addNewContacts);
  const openAddContactModal = useAddContactStore(
    (state) => state.openAddFriendModal,
  );
  const closeEditFriendName = useAddContactStore(
    (state) => state.closeEditFriendName,
  );
  const closeAddFriendModal = useAddContactStore(
    (state) => state.closeAddFriendModal,
  );
  const openAddFriendModal = useAddContactStore(
    (state) => state.openAddFriendModal,
  );

  const openEditFriendName = useAddContactStore(
    (state) => state.openEditFriendName,
  );

  const closeAddContactModal = () => {
    addNewFriend && closeAddFriendModal();
    if (editFriendName) {
      closeEditFriendName();
      openAddFriendModal();
    }
  };
  const setFriendName = useAddContactStore((state) => state.setFriendName);
  const friendUuid = useAddContactStore((state) => state.friendUuid);
  const editFriendName = useAddContactStore((state) => state.editFriendName);
  const friendName = useAddContactStore((state) => state.friendName);
  const scannedQRdata = useGlobalStore((state) => state.scannedQr);
  const setScannedQr = useGlobalStore((state) => state.setScannedQr);
  const [newName, setNewName] = useState<string>(friendName);

  const editName = async (e) => {
    await setNewName(e);
  };
  useEffect(() => {
    setFriendName(newName);
  }, [newName, setFriendName]);

  useEffect(() => {
    if (scannedQRdata.uid !== "") {
      setScannedQr({
        name: "",
        uid: "",
        amount: null,
        network: "ethereum",
        qrType: "directTransfer",
        transferType: "internal",
      });
    }
  }),
    [scannedQRdata, setScannedQr];

  return (
    <SidebarPageWrapper isOpen={open} onClose={closeAddContactModal}>
      <div className="flex flex-col justify-between h-screen">
        <div className="flex flex-col items-center">
          <CustomTopbar
            showLeftIcon
            leftIconOnClick={() => {
              addNewFriend && closeAddFriendModal();
              if (editFriendName) {
                closeEditFriendName();
                openAddFriendModal();
              }
            }}
            componentClassName="w-full"
          />
          <div className="px-5 flex flex-col gap-[25px] justify-center items-center">
            <img
              src={"/assets/images/home/user.svg"}
              alt=""
              className="h-[60px] w-[60px]"
            />
            <div className="flex flex-col  justify-center items-center gap-1">
              {addNewFriend && (
                <div className="flex items-center gap-1">
                  <p className="text-Neutral-n700 text-center font-urbanist text-lg font-bold leading-[120%]">
                    {friendName}
                  </p>
                  <img
                    src={"/assets/icons/edit-pencil.svg"}
                    alt=""
                    className="h-3 w-3"
                    onClick={() => {
                      closeAddFriendModal();
                      openEditFriendName();
                    }}
                  />
                </div>
              )}
              {editFriendName && (
                <div className="flex self-stretch  border-b-[0.3px]">
                  <input
                    className="flex flex-1 justify-start text-Neutral-n700 text-start font-poppins text-lg font-bold leading-[120%]"
                    value={newName}
                    onChange={(e) => editName(e.target.value)}
                  />
                  <img
                    src={"/assets/icons/edit-pencil.svg"}
                    alt=""
                    className="h-3 w-3 flex justify-end"
                  />
                </div>
              )}
              <p className="text-Neutral-n400 text-center font-urbanist text-base font-medium leading-[140%] tracking-[0.2px]">
                PAYPAY ID : {maskUUID(friendUuid)}
              </p>
            </div>
          </div>
        </div>
        {addNewFriend && (
          <div className="px-5">
            <CustomButton
              text={t("completed")}
              className="h-[60px] mb-13.5 !font-semibold !text-2xl !rounded-[20px]"
              type="submit"
              onClick={async () => {
                await addNewContacts(friendName);
                closeAddFriendModal();
              }}
            />
          </div>
        )}
        {editFriendName && (
          <div className="px-5">
            <CustomButton
              text={t("update")}
              className="h-[60px] mb-13.5 !font-semibold !text-2xl !rounded-[20px]"
              type="submit"
              isDisabled={newName === ""}
              onClick={async () => {
                if (newName === "") return;
                setFriendName(newName);
                console.log(friendName);
                await closeEditFriendName();
                openAddContactModal();
              }}
            />
          </div>
        )}
      </div>
    </SidebarPageWrapper>
  );
};

export default AddNewContact;
