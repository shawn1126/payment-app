import { Box, Drawer } from "@mui/material";

import { CustomButton } from "components/generic";
interface ConfirmTransferModalProps {
  open: boolean;
  closeModal: () => void;
  onConfirm: () => void;
  name: string;
  uid: string;
  transferType: string;
  amount: number;
}

const ConfirmTransferModal = ({
  open,
  closeModal,
  name,
  uid,
  transferType,
  amount,
  onConfirm,
}: ConfirmTransferModalProps) => {
  return (
    <Drawer
      open={open}
      onClose={closeModal}
      sx={{
        maxHeight: "55vh",
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

        <h4 className="mb-4 text-midnight-blue font-poppins text-2xl font-bold leading-8 tracking-[-0.15px] text-center">
          確認支付
        </h4>
        <div className="px-5 flex flex-col gap-3">
          <div className="mb-3">
            <p className="text-sm text-Neutral-n400">發送至</p>
            <div className="mt-[5px] flex gap-5 items-center">
              <img
                src="/assets/images/home/user.svg"
                width="48"
                height="48"
                alt="user"
              />
              <div className="text-sm font-medium text-Neutral-n700">
                <p>{name}</p>
                <p
                  className="break-all text-right"
                  style={{ lineBreak: "anywhere" }}
                >
                  PAYPAY ID: {uid}
                </p>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <p className="text-sm text-Neutral-n400">發送至</p>
            <p className="text-sm font-medium">{amount} USDT</p>
          </div>
          <div>
            <p className="text-sm text-Neutral-n400">類型</p>
            <p className="text-sm font-medium">{transferType || "內部轉帳"}</p>
          </div>
        </div>
        <div className="px-5">
          <CustomButton
            text="繼續"
            className="mt-[83px] !h-[60px] !rounded-[20px] text-[24px] font-semibold"
            onClick={onConfirm}
          />
          <p className="mt-1.5 text-sm font-medium mb-[60px] text-center">
            請確認收款人及金額正確無誤。不支援退款。
          </p>
        </div>
      </Box>
    </Drawer>
  );
};

export default ConfirmTransferModal;
