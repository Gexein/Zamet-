import { create } from "zustand";
import { IAppInfoState } from "../types";

export const useAppInfoStore = create<IAppInfoState>((set, get) => ({
	messages: [],
	setMessage(message) {
		set((state) => ({messages: [...state.messages, message]}));
	},
	clearMessage() {
		set({ messages: [] });
	},
}));
