import { create } from "zustand";
import { IDrawerState } from "../types";

export const useDrawerVisibility = create<IDrawerState>((set, get) => ({
	isOpen: false,

	setIsOpen: (isOpen: IDrawerState["isOpen"]) => set({ isOpen: isOpen }),

	toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
