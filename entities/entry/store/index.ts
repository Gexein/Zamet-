import { create } from "zustand";
import { IEntryState, IEntry } from "../types";
import { EntryStorage } from "../storage";

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
			console.error("Ошибка инициализации EntryStore:", error);
			set({ isLoading: false, isInitialized: true });
		}
	},

	loadEntries: async (categorySubId: number) => {
		set({ isLoading: true });
		try {
			const entries = await get().storage.getAllEntries(categorySubId);
			set({ entries, isLoading: false });
		} catch (error) {
			console.error("Ошибка загрузки записей:", error);
			set({ isLoading: false });
			throw error;
		}
	},

	createEntry: async (
		categorySubId: number,
		name: IEntry["name"],
		description?: IEntry["description"],
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
			console.error("Ошибка создания записи:", error);
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
			console.error("Ошибка обновления имени записи:", error);
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
			console.error("Ошибка обновления содержимого записи", error);
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
			console.error("Ошибка обновления даты записи", error);
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
			console.error("Ошибка удаления записи:", error);
			set({ isLoading: false });
			throw error;
		}
	},

	setCurrentEntry: (entry: IEntry | null) => {
		set({ currentEntry: entry });
	},
}));









