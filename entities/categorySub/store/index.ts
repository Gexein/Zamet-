import { create } from "zustand";
import { ICategorySubState, ICategorySub } from "../types";
import { CategorySubStorage } from "../storage";
import { CATEGORY_SUB_ERRORS } from "../../../shared/consts/errors";

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
			console.error(CATEGORY_SUB_ERRORS.INIT_STORE, error);
			set({ isLoading: false, isInitialized: true });
		}
	},

	loadSubcategories: async (categoryId: number) => {
		set({ isLoading: true });
		try {
			const subcategories = await get().storage.getAllSubcategories(categoryId);
			set({ subcategories, isLoading: false });
		} catch (error) {
			console.error(CATEGORY_SUB_ERRORS.LOAD, error);
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
			console.error(CATEGORY_SUB_ERRORS.CREATE_STORE, error);
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
			console.error(CATEGORY_SUB_ERRORS.UPDATE_NAME_STORE, error);
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
			console.error(CATEGORY_SUB_ERRORS.DELETE_STORE, error);
			set({ isLoading: false });
			throw error;
		}
	},

	setCurrentSubcategory: (subcategory: ICategorySub | null) => {
		set({ currentSubcategory: subcategory });
	},
	updateSubcategoryDescription: async (
		id: number,
		categoryId: number,
		description?: ICategorySub["description"]
	) => {
		set({ isLoading: true });
		try {
			await get().storage.updateSubcategoryDescription(id, categoryId, description);
			set((state) => ({
				subcategories: state.subcategories.map((subcategory) =>
					subcategory.id === id ? { ...subcategory, description } : subcategory
				),
			}));
		} catch (error) {
			console.error(CATEGORY_SUB_ERRORS.UPDATE_DESCRIPTION_STORE, error);
			throw error;
		} finally {
			set({ isLoading: false });
		}
	},
}));









