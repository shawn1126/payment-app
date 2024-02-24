import QrReader from "react-qr-scanner";
import { useAddContactStore } from "store/addContactStore";
import { useAuthStore } from "store/authStore";
import { qrScanResultType, useGlobalStore } from "store/globalStore";
import { useHomeStore } from "store/homeStore";

import {
  CustomButton,
  CustomTopbar,
  SidebarPageWrapper,
} from "components/generic";

const ScanQr = ({ open }: { open: boolean }) => {
  const setScannedQr = useGlobalStore((state) => state.setScannedQr);
  const qrType = useGlobalStore((state) => state.qrScannerDetails?.type);
  const user = useAuthStore((state) => state.user);
  const setqrScannerDetails = useGlobalStore(
    (state) => state.setqrScannerDetails,
  );

  const showNotification = useGlobalStore((state) => state.showNotification);

  const setmyQrDetails = useGlobalStore((state) => state.setmyQrDetails);
  const openAddFrienModal = useAddContactStore(
    (state) => state.openAddFriendModal,
  );
  const setFriendName = useAddContactStore((state) => state.setFriendName);
  const openSendTokenModal = useHomeStore((state) => state.openSendTokenModal);
  const closeAddFriendModal = useAddContactStore(
    (state) => state.closeAddFriendModal,
  );
  const setFriendUuid = useAddContactStore((state) => state.setFriendUuid);

  console.log("typescanner", qrType);

  const onScanSuccess = (data: string) => {
    const parsedData: qrScanResultType = JSON.parse(data);

    if (qrType === "addFriend" && parsedData?.qrType !== "addFriend") {
      showNotification("error", "QR code is not valid for adding friend");
      return;
    }
    if (
      qrType === "directTransfer" &&
      parsedData?.qrType !== "directTransfer"
    ) {
      showNotification("error", "QR code is not valid for direct transfer");
      return;
    }
    if (parsedData.uid === user.UUID) {
      showNotification("error", "You are scanning your own QR code");
      return;
    }

    setScannedQr(parsedData);
    console.log("parsedData", parsedData);
    setFriendName(parsedData.name);
    setFriendUuid(parsedData.uid);
    if (parsedData?.qrType === "addFriend") {
      openAddFrienModal();
      setScannedQr({
        name: "",
        uid: "",
        amount: null,
        network: "ethereum",
        qrType: "directTransfer",
        transferType: "internal",
      });
    } else if (parsedData?.qrType === "directTransfer") {
      openSendTokenModal();
    }
    setqrScannerDetails({ open: false, type: null });
  };
  console.log("typescanner", qrType);
  return (
    <SidebarPageWrapper
      isOpen={open}
      onClose={() => {
        setqrScannerDetails({ open: false, type: null });
      }}
    >
      <div className="absolute w-screen h-screen">
        <div className="w-screen h-screen absolute z-[11] bg-no-repeat bg-cover bg-top bg-qr-bg"></div>
        <QrReader
          style={{
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
          }}
          onScan={(data) => data && onScanSuccess(data.text)}
          onError={(err) => console.log(err)}
          constraints={{
            video: { facingMode: "environment" },
          }}
        />
      </div>
      <div className="relative z-20 flex flex-col justify-between flex-1 pb-5">
        <CustomTopbar
          leftIconOnClick={() => {
            setqrScannerDetails({ open: false, type: null });
            closeAddFriendModal();
          }}
        />
        <CustomButton
          className="flex justify-center items-center h-[60px] !bg-[#00000099] max-w-[90%] mx-auto !rounded-[20px]"
          onClick={() => setmyQrDetails({ open: true, type: qrType })}
        >
          <div className="flex gap-1.5">
            <img
              src="/assets/icons/qr-icon.svg"
              alt="qr-scan"
              width={24}
              height={24}
            />
            <p className="font-poppins text-sm text-[#EEEEEE]">
              我的 QR code 條碼
            </p>
          </div>
        </CustomButton>
      </div>
    </SidebarPageWrapper>
  );
};
export default ScanQr;
