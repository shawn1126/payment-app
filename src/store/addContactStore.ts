import { addFriend } from "api/apiCalls";
import { create } from "zustand";

import { useAuthStore } from "./authStore";
import { useGlobalStore } from "./globalStore";
interface AddContactState {
  addNewFriend: boolean;
  editFriendName: boolean;
  friendName: string;
  friendUuid: string;
  setFriendName: (name: string) => void;
  setFriendUuid: (uuid: string) => void;
  openAddFriendModal: () => void;
  closeAddFriendModal: () => void;
  openEditFriendName: () => void;
  closeEditFriendName: () => void;
  addNewContacts: (friendName: string) => Promise<boolean>;
}

export const useAddContactStore = create<AddContactState>()((set) => ({
  addNewFriend: false,
  editFriendName: false,
  friendName: "",
  setFriendName: (name: string) => set({ friendName: name }),
  friendUuid: "",
  setFriendUuid: (uuid: string) => set({ friendUuid: uuid }),
  openAddFriendModal: () => set({ addNewFriend: true }),
  closeAddFriendModal: () => set({ addNewFriend: false }),
  openEditFriendName: () => set({ editFriendName: true }),
  closeEditFriendName: () => set({ editFriendName: false }),
  addNewContacts: async (friendName) => {
    const showNotification = useGlobalStore.getState().showNotification;
    const setIsLoading = useGlobalStore.getState().setIsLoading;
    try {
      setIsLoading(true);
      const res = await addFriend({
        owneruuid: useAuthStore.getState().userEmailAndUid.uid,
        frienduuid: useAddContactStore.getState().friendUuid,
        friendname: friendName,
      });
      console.log(res);
      //no response yet
      setIsLoading(false);
      showNotification("success", "Friend added successfully");
      useAddContactStore.getState().closeAddFriendModal();
      return true;
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      showNotification("error", err.response.data.message);
      return false;
    }
  },
}));
