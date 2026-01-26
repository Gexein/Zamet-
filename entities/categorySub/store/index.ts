import { create } from "zustand";
import { ICategorySubState, ICategorySub } from "../types";
import { CategorySubStorage } from "../storage";

export const useCategorySubStore = create<ICategorySubState>((set, get) => ({
	subcategories: [],
	currentSubcategory: null,
	isLoading: false,
	isInitialized: false,
	storage: new CategorySubStorage(),

	initialize: async (categoryId: number) => {
		if (get().isInitialized) return;
		set({ isLoading: true });
		try {
			await get().storage.initializeCategorySubDb();
			const subcategories = await get().storage.getAllSubcategories(categoryId);
			set({ subcategories, isInitialized: true, isLoading: false });
		} catch (error) {
			console.error("Ошибка инициализации CategorySubStore:", error);
			set({ isLoading: false, isInitialized: true });
		}
	},

	loadSubcategories: async (categoryId: number) => {
		set({ isLoading: true });
		try {
			const subcategories = await get().storage.getAllSubcategories(categoryId);
			set({ subcategories, isLoading: false });
		} catch (error) {
			console.error("Ошибка загрузки подкатегорий:", error);
			set({ isLoading: false });
			throw error;
		}
	},

	createSubcategory: async (
		categoryId: number,
		name: ICategorySub["name"],
		description?: ICategorySub["description"]
	) => {
		set({ isLoading: true });
		try {
			const subcategory = await get().storage.createSubcategory(
				categoryId,
				name,
				description
			);
			set((state) => ({
				subcategories: [...state.subcategories, subcategory],
				isLoading: false,
			}));
			return subcategory;
		} catch (error) {
			console.error("Ошибка создания подкатегории:", error);
			set({ isLoading: false });
			throw error;
		}
	},

	updateSubcategoryName: async (
		id: number,
		categoryId: number,
		name: ICategorySub["name"]
	) => {
		set({ isLoading: true });
		try {
			await get().storage.updateSubcategoryName(id, categoryId, name);
			set((state) => ({
				subcategories: state.subcategories.map((sub) =>
					sub.id === id ? { ...sub, name } : sub
				),
				isLoading: false,
			}));
		} catch (error) {
			console.error("Ошибка обновления имени подкатегории:", error);
			set({ isLoading: false });
			throw error;
		}
	},

	deleteSubcategory: async (id: number, categoryId: number) => {
		set({ isLoading: true });
		try {
			await get().storage.deleteSubcategory(id, categoryId);
			set((state) => ({
				subcategories: state.subcategories.filter((sub) => sub.id !== id),
				currentSubcategory:
					state.currentSubcategory?.id === id ? null : state.currentSubcategory,
				isLoading: false,
			}));
		} catch (error) {
			console.error("Ошибка удаления подкатегории:", error);
			set({ isLoading: false });
			throw error;
		}
	},

	setCurrentSubcategory: (subcategory: ICategorySub | null) => {
		set({ currentSubcategory: subcategory });
	},
	updateSubcategoryDescription: async (
		id: number,
		categotyId: number,
		description?: ICategorySub["description"]
	) => {
		set({ isLoading: true });
		try {
			await get().updateSubcategoryDescription(id, categotyId, description);
			set((state) => ({
				subcategories: state.subcategories.map((subcategory) =>
					subcategory.id === id ? { ...subcategory, description } : subcategory
				),
			}));
		} catch (error) {
			console.error("Ошибка обновления описания подкатегории", error);
			throw error;
		} finally {
			set({ isLoading: false });
		}
	},
}));







