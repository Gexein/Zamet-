import { create } from "zustand";
import { IEntryState, IEntry } from "../types";
import { EntryStorage } from "../storage";
import { ENTRY_ERRORS } from "../../../shared/consts/errors";

export const useEntryStore = create<IEntryState>((set, get) => ({
	entries: [],
	currentEntry: null,
	isLoading: false,
	isInitialized: false,
	storage: new EntryStorage(),

	initialize: async (categorySubId: number) => {
		if (get().isInitialized) return;
		set({ isLoading: true });
		try {
			await get().storage.initializeEntryDb();
			const entries = await get().storage.getAllEntries(categorySubId);
			set({ entries, isInitialized: true, isLoading: false });
		} catch (error) {
			console.error(ENTRY_ERRORS.INIT_STORE, error);
			set({ isLoading: false, isInitialized: true });
		}
	},

	loadEntries: async (categorySubId: number) => {
		set({ isLoading: true });
		try {
			const entries = await get().storage.getAllEntries(categorySubId);
			set({ entries, isLoading: false });
		} catch (error) {
			console.error(ENTRY_ERRORS.LOAD, error);
			set({ isLoading: false });
			throw error;
		}
	},

	createEntry: async (
		categorySubId: number,
		name?: IEntry["name"],
		description: IEntry["description"],
		date?: IEntry["date"]
	) => {
		set({ isLoading: true });
		try {
			const entry = await get().storage.createEntry(
				categorySubId,
				name,
				description,
				date
			);
			set((state) => ({
				entries: [...state.entries, entry],
				isLoading: false,
			}));
			return entry;
		} catch (error) {
			console.error(ENTRY_ERRORS.CREATE_STORE, error);
			set({ isLoading: false });
			throw error;
		}
	},

	updateEntryName: async (
		id: number,
		categorySubId: number,
		name: IEntry["name"]
	) => {
		set({ isLoading: true });
		try {
			await get().storage.updateEntryName(id, categorySubId, name);
			set((state) => ({
				entries: state.entries.map((entry) =>
					entry.id === id ? { ...entry, name } : entry
				),
				isLoading: false,
			}));
		} catch (error) {
			console.error(ENTRY_ERRORS.UPDATE_NAME_STORE, error);
			set({ isLoading: false });
			throw error;
		}
	},
	updateEntryDescription: async (
		id: number,
		categorySubId: number,
		description: IEntry["description"]
	) => {
		set({ isLoading: true });
		try {
			await get().storage.updateEntryDescription(
				id,
				categorySubId,
				description
			);
			set((state) => ({
				entries: state.entries.map((entry) =>
					entry.id === id ? { ...entry, description } : entry
				),
			}));
		} catch (error) {
			console.error(ENTRY_ERRORS.UPDATE_DESCRIPTION_STORE, error);
			throw error;
		} finally {
			set({ isLoading: false });
		}
	},
	updateEntryDate: async (
		id: number,
		categorySubId: number,
		date?: IEntry["date"]
	) => {
		set({ isLoading: true });
		try {
			await get().storage.updateEntryDate(id, categorySubId, date);
			set((state) => ({
				entries: state.entries.map((entry) =>
					entry.id === id ? { ...entry, date } : entry
				),
			}));
		} catch (error) {
			console.error(ENTRY_ERRORS.UPDATE_DATE_STORE, error);
			throw error;
		} finally {
			set({ isLoading: false });
		}
	},

	deleteEntry: async (id: number, categorySubId: number) => {
		set({ isLoading: true });
		try {
			await get().storage.deleteEntry(id, categorySubId);
			set((state) => ({
				entries: state.entries.filter((entry) => entry.id !== id),
				currentEntry: state.currentEntry?.id === id ? null : state.currentEntry,
				isLoading: false,
			}));
		} catch (error) {
			console.error(ENTRY_ERRORS.DELETE_STORE, error);
			set({ isLoading: false });
			throw error;
		}
	},

	setCurrentEntry: (entry: IEntry | null) => {
		set({ currentEntry: entry });
	},
}));









