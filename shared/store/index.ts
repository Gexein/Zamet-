import { create } from "zustand";

interface IDrawerState {
	isOpen: boolean;
	setIsOpen: (isOpen: IDrawerState["isOpen"]) => void;
	toggle: () => void;
}

export const useDrawerVisibility = create<IDrawerState>((set, _get) => ({
	isOpen: false,

	setIsOpen: (isOpen: IDrawerState["isOpen"]) => set({ isOpen: isOpen }),

	toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
