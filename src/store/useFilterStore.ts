import { create } from "zustand";

type FilterStore = {
  search: string;
  price: string;
  isOpen: boolean;
  setSearch: (search: string) => void;
  setPrice: (price: string) => void;
  setOpen: (isOpen?: boolean) => void;
};

export const useFilterStore = create<FilterStore>((set) => ({
  search: "",
  price: "all",
  isOpen: false,
  setSearch: (search: string) => set({ search }),
  setPrice: (price: string) => set({ price }),
  setOpen: (isOpen) =>
    set((state) => ({
      isOpen: typeof isOpen === "boolean" ? isOpen : !state.isOpen,
    })),
}));
