import { create } from "zustand";

interface CollectionState {
  isPayoutStatusOpen: boolean;
  payoutStatusOpenModal: () => void;
  closePayoutStatusModal: () => void;
}

export const useCollectionStore = create<CollectionState>()((set) => ({
  isPayoutStatusOpen: false,
  payoutStatusOpenModal: () => set({ isPayoutStatusOpen: true }),
  closePayoutStatusModal: () => set({ isPayoutStatusOpen: false }),
}));
