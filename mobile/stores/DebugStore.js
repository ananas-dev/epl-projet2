import { create } from "zustand";

const useDebugStore = create((set) => ({
  enabled: false,
  toogle: () =>
    set((state) => {
      state.enabled = !state.enabled;
    }),
}));

export { useDebugStore };
