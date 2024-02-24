import { create } from "zustand";

import { ContactType } from "components/generic/UserAccDetails";
export type qrTypes = "addFriend" | "directTransfer" | "externalTransfer";

export type networkTypes =
  | "tron"
  | "ethereum"
  | "bnb"
  | "solana"
  | "polygon"
  | "avalanche"
  | "optimism";

export type qrScanResultType = {
  uid: string;
  name: string;
  qrType: qrTypes;
  transferType: "internal" | "external";
  amount: string;
  network: networkTypes;
};

interface GlobalState {
  isContactListDrawerOpen: boolean;
  selectedContact: ContactType;
  isNetworkModalOpen: boolean;
  selectedNetwork: string;
  selectedToken1: string;
  selectedToken2: string;

  qrScannerDetails: {
    open: boolean;
    type: qrTypes;
  };
  setqrScannerDetails: (details: { open: boolean; type: qrTypes }) => void;

  myQrDetails: {
    open: boolean;
    type: qrTypes;
  };
  setmyQrDetails: (details: { open: boolean; type: qrTypes }) => void;

  scannedQr: qrScanResultType;
  setScannedQr: (scannedQr: qrScanResultType) => void;

  isLoading: boolean;

  notification: {
    open: boolean;
    type: "success" | "error" | "warning" | "info";
    message: string;
  };

  isRequirePaymentPassResetModalOpen: boolean;

  openContactListDrawer: () => void;
  closeContactListDrawer: () => void;
  openNetworkModal: () => void;
  closeNetworkModal: () => void;

  setSelectedContact: (contact: ContactType) => void;

  setSelectedNetwork: (network: string) => void;

  setIsLoading: (isLoading: boolean) => void;
  showNotification: (
    type: "success" | "error" | "warning" | "info",
    message: string,
  ) => void;

  setIsRequirePaymentPassResetModalOpen: (isOpen: boolean) => void;
}

export const useGlobalStore = create<GlobalState>()((set) => ({
  isContactListDrawerOpen: false,
  isNetworkModalOpen: false,
  selectedNetwork: "tron",
  selectedToken1: "NTD",
  selectedToken2: "USDT",
  isLoading: false,
  selectedContact: { img: "/assets/images/home/user.svg", uid: "2345428" },
  notification: {
    open: false,
    type: "success",
    message: "Notification",
  },
  isRequirePaymentPassResetModalOpen: false,

  openContactListDrawer: () => set({ isContactListDrawerOpen: true }),
  closeContactListDrawer: () => set({ isContactListDrawerOpen: false }),
  openNetworkModal: () => set({ isNetworkModalOpen: true }),
  closeNetworkModal: () => set({ isNetworkModalOpen: false }),
  setSelectedContact: (contact) => set({ selectedContact: contact }),
  setSelectedNetwork: (network) => set({ selectedNetwork: network }),
  setIsLoading: (isLoading) => set({ isLoading: isLoading }),
  showNotification: (type, message) => {
    set({
      notification: {
        open: true,
        type: type,
        message: message,
      },
    });
    setTimeout(() => {
      set({
        notification: {
          open: false,
          type: type,
          message: message,
        },
      });
    }, 3000);
  },
  scannedQr: {
    uid: "",
    name: "",
    qrType: "addFriend",
    transferType: "internal",
    amount: "",
    network: "ethereum",
  },
  setScannedQr: (scannedQr) => {
    set({ scannedQr: scannedQr });
  },

  qrScannerDetails: {
    open: false,
    type: "addFriend",
  },

  setqrScannerDetails: (details) => {
    set({ qrScannerDetails: details });
  },

  myQrDetails: {
    open: false,
    type: "addFriend",
  },
  setmyQrDetails: (details) => {
    set({ myQrDetails: details });
  },
  setIsRequirePaymentPassResetModalOpen: (isOpen) => {
    set({ isRequirePaymentPassResetModalOpen: isOpen });
  },
}));
