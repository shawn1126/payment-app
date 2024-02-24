import { Box, Drawer } from "@mui/material";
import { QRCodeSVG } from "qrcode.react";
import { useAuthStore } from "store/authStore";
import { useGlobalStore } from "store/globalStore";

import { Divider } from "components/generic";

const MyQr = ({ open }: { open: boolean }) => {
  const setmyQrDetails = useGlobalStore((state) => state.setmyQrDetails);
  const { uid } = useAuthStore((state) => state.userEmailAndUid);
  const user = useAuthStore((state) => state.user);
  const qrType = useGlobalStore((state) => state.qrScannerDetails?.type);

  return (
    <Drawer
      open={open}
      onClose={() => setmyQrDetails({ open: false, type: null })}
      sx={{
        maxHeight: "75vh",
      }}
      anchor={"bottom"}
      PaperProps={{
        sx: {
          borderRadius: "20px 20px 0 0",
        },
      }}
    >
      <Box
        sx={{
          width: "100vw",
          display: "flex",
          flexDirection: "column",
        }}
        role="presentation"
      >
        <div className="mt-2 mb-2.5 w-32 h-1 mx-auto rounded-[10px] bg-Neutral-n700"></div>
        <div className="mt-12 flex flex-col items-center">
          {uid && (
            <QRCodeSVG
              value={JSON.stringify({
                uid,
                name: user.UserName,
                qrType: qrType,
                transferType: null,
                amount: null,
              })}
              width={192}
              height={197}
            />
          )}
          <p className="font-poppins text-sm text-Neutral-n400 leading-5.5 tracking-[0.14px] mt-[26px]">
            顯示或發送行動條碼來加入好友
          </p>
          <Divider className="my-5 w-full !bg-light-grey" />
          <div className="flex justify-center gap-10 mb-32">
            <div className="flex flex-col gap-[7px] items-center">
              <img
                src="/assets/icons/download-qr.svg"
                alt="qr-icon"
                width={24}
                height={24}
              />
              <p className="text-Neutral-n700 font-poppins text-sm">儲存QR</p>
            </div>
            <div className="flex flex-col gap-[7px] items-center">
              <img
                src="/assets/icons/send-qr.svg"
                alt="qr-icon"
                width={24}
                height={24}
              />
              <p className="text-Neutral-n700 font-poppins text-sm">分享帳號</p>
            </div>
          </div>
        </div>
      </Box>
    </Drawer>
  );
};

export default MyQr;
