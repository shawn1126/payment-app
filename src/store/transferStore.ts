import { getFriends, transferPointsApi } from "api/apiCalls";
import { transferPointsInputType, TxType } from "api/apiTypes";
import { create } from "zustand";

import { useAuthStore } from "./authStore";
import { useGlobalStore } from "./globalStore";

type SearchedContactResponseType = {
  message: string;
  UUID: string;
  UserName: string;
}[];

export type SearchedContactInputType = {
  email: string;
  phone: string;
  uid: string;
};

interface TransferStoreState {
  transferPoints: ({
    amount_points,
    from_uuid,
    to_uuid,
    paymentpassword,
  }: transferPointsInputType) => Promise<string>;
  selectedContactForTransfer?: string;
  setSelectedContactForTransfer: (arg: string) => void;
  searchContact: ({
    email,
    phone,
    uid,
  }: SearchedContactInputType) => Promise<SearchedContactResponseType>;

  txHistory: TxType[];
  setTxHistory: (arg: TxType[]) => void;
}

export const useTransferStore = create<TransferStoreState>()((set) => ({
  transferPoints: async ({ amount_points, to_uuid, paymentpassword }) => {
    const showNotification = useGlobalStore.getState().showNotification;
    const setIsLoading = useGlobalStore.getState().setIsLoading;
    // const updateUserPoints = useAuthStore.getState().updateUserPoints;
    const user = useAuthStore.getState().user;
    if (+user.Points < parseInt(amount_points)) {
      showNotification("error", "You don't have enough points");
      return "insufficient_balance";
    }

    setIsLoading(true);
    try {
      const res = await transferPointsApi({
        amount_points: amount_points,
        from_uuid: user.UUID,
        to_uuid: to_uuid,
        paymentpassword: paymentpassword,
      });

      console.log("res", res);
      setIsLoading(false);
      return "success";
    } catch (error) {
      setIsLoading(false);
      console.log("__error", error?.response);
      showNotification("error", error.message);
      if (
        error?.response?.data?.message === "Payment Password isn't correct."
      ) {
        return "payment_password_error";
      }
      return "error";
    }
  },
  selectedContactForTransfer: "",
  setSelectedContactForTransfer: (arg) =>
    set({ selectedContactForTransfer: arg }),

  searchContact: async ({ email, phone, uid }) => {
    const setIsLoading = useGlobalStore.getState().setIsLoading;
    const showNotification = useGlobalStore.getState().showNotification;
    setIsLoading(true);
    try {
      const res = await getFriends({ email, phone, uid });
      setIsLoading(false);
      return [res];
    } catch (error) {
      setIsLoading(false);
      showNotification("error", error.response.data);
      return [];
    }
  },
  txHistory: [],
  setTxHistory: (arg) => set({ txHistory: arg }),
}));
