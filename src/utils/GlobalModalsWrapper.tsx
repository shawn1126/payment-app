import { useEffect, useState } from "react";
import { useAddContactStore } from "store/addContactStore";
import { useGlobalStore } from "store/globalStore";

import { ContactListDrawer, SelectNetworkModal } from "components/generic";
import AddNewContact from "components/generic/AddNewContact";
import ResetPaymentPasswordSuggestModal from "components/generic/ResetPaymentPasswordSuggestModal";
import { MyQr, ScanQr } from "components/qrCode";
import { SendToken } from "components/transfer";

const GlobalModalsWrapper = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [networkOpen, setNetworkOpen] = useState(false);
  const [myQrOpen, setMyQrOpen] = useState(false);
  const [scanQrOpen, setScanQrOpen] = useState(false);

  const isContactListDrawerOpen = useGlobalStore(
    (state) => state.isContactListDrawerOpen,
  );
  const isNetworkModalOpen = useGlobalStore(
    (state) => state.isNetworkModalOpen,
  );

  const addNewFriend = useAddContactStore((state) => state.addNewFriend);
  const editFriendName = useAddContactStore((state) => state.editFriendName);
  const qrScannerDetails = useGlobalStore((state) => state.qrScannerDetails);
  const isMyQrOpen = useGlobalStore((state) => state.myQrDetails?.open);

  //   when isContactListDrawerOpen or isNetworkModalOpen is true, render modal immidiately but open for 0.5 seconds to pass open

  useEffect(() => {
    if (isContactListDrawerOpen) setTimeout(() => setContactOpen(true), 500);
    else setContactOpen(false);
  }, [isContactListDrawerOpen]);

  useEffect(() => {
    if (isNetworkModalOpen) setNetworkOpen(true);
    else setNetworkOpen(false);
  }, [isNetworkModalOpen]);

  useEffect(() => {
    if (isMyQrOpen) setMyQrOpen(true);
    else setMyQrOpen(false);
  }, [isMyQrOpen]);

  useEffect(() => {
    if (qrScannerDetails?.open) setScanQrOpen(true);
    else setScanQrOpen(false);
  }, [qrScannerDetails?.open]);

  return (
    <>
      {isContactListDrawerOpen && <ContactListDrawer open={contactOpen} />}
      {isNetworkModalOpen && <SelectNetworkModal open={networkOpen} />}

      {qrScannerDetails?.open && <ScanQr open={scanQrOpen} />}

      {isMyQrOpen && <MyQr open={myQrOpen} />}

      {addNewFriend && <AddNewContact open={addNewFriend} />}
      {editFriendName && <AddNewContact open={editFriendName} />}

      <ResetPaymentPasswordSuggestModal />

      <SendToken />
    </>
  );
};

export default GlobalModalsWrapper;
