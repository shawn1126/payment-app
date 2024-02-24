import {
  processWithdraw,
  sendWithdrawEmail,
  sendWithdrawSms,
} from "api/apiCalls";
import { create } from "zustand";

import { useAuthStore } from "./authStore";
import { useGlobalStore } from "./globalStore";

interface HomeState {
  isSendTokenModalOpen: boolean;
  isTopUpAccDetailsModalOpen: boolean;
  isReceiveModalOpen: boolean;
  isWithdrawModalOpen: boolean;
  openReceiveModal: () => void;
  closeReceiveModal: () => void;
  openSendTokenModal: () => void;
  closeSendTokenModal: () => void;
  openTopUpAccDetailsModal: () => void;
  closeTopUpAccDetailsModal: () => void;
  openWithdrawModal: () => void;
  closeWithdrawModal: () => void;
  sendWithdrawEmail: () => Promise<boolean>;
  sendWithdrawSMS: () => Promise<boolean>;
  processWithdraw: ({
    emailCode,
    smsCode,
  }: {
    emailCode: string;
    smsCode: string;
  }) => Promise<boolean>;
}

export const useHomeStore = create<HomeState>()((set) => ({
  isSendTokenModalOpen: false,
  isTopUpAccDetailsModalOpen: false,
  isReceiveModalOpen: false,
  isWithdrawModalOpen: false,
  openReceiveModal: () => set({ isReceiveModalOpen: true }),
  closeReceiveModal: () => set({ isReceiveModalOpen: false }),
  openSendTokenModal: () => set({ isSendTokenModalOpen: true }),
  closeSendTokenModal: () => set({ isSendTokenModalOpen: false }),
  openTopUpAccDetailsModal: () => set({ isTopUpAccDetailsModalOpen: true }),
  closeTopUpAccDetailsModal: () => set({ isTopUpAccDetailsModalOpen: false }),
  openWithdrawModal: () => set({ isWithdrawModalOpen: true }),
  closeWithdrawModal: () => set({ isWithdrawModalOpen: false }),
  sendWithdrawEmail: async () => {
    const showNotification = useGlobalStore.getState().showNotification;
    const setIsLoading = useGlobalStore.getState().setIsLoading;
    try {
      setIsLoading(true);
      const email = useAuthStore.getState()?.user?.Email;
      const uuid = useAuthStore.getState()?.user?.UUID;
      await sendWithdrawEmail({
        email: email,
        uuid: uuid,
      });
      setIsLoading(false);
      showNotification("success", "code sent to your email");
      return true;
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      showNotification("error", "something went wrong");
      return false;
    }
  },
  sendWithdrawSMS: async () => {
    const showNotification = useGlobalStore.getState().showNotification;
    const setIsLoading = useGlobalStore.getState().setIsLoading;
    try {
      setIsLoading(true);
      const uuid = useAuthStore.getState()?.user?.UUID;
      await sendWithdrawSms({
        uuid: uuid,
      });
      setIsLoading(false);
      showNotification("success", "code sent to your phone number");
      return true;
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      showNotification("error", "something went wrong");
      return false;
    }
  },

  processWithdraw: async ({ emailCode, smsCode }) => {
    const showNotification = useGlobalStore.getState().showNotification;
    const setIsLoading = useGlobalStore.getState().setIsLoading;
    try {
      setIsLoading(true);
      const uuid = useAuthStore.getState()?.user?.UUID;
      await processWithdraw({
        uuid: uuid,
        withdrawlEmailVerificationCode: emailCode,
        withdrawlSMSVerificationCode: smsCode,
      });
      setIsLoading(false);
      showNotification("success", "withdraw request sent");
      return true;
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      showNotification("error", "something went wrong");
      return false;
    }
  },
}));
