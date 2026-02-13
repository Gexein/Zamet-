import { create } from "zustand";
import { ICategoryState, ICategory } from "../types";
import { CategoryStorage } from "../storage";
import { CATEGORY_ERRORS } from "../../../shared/consts/errors";

export const useCategoryStore = create<ICategoryState>((set, get) => ({
	categories: [],
	currentCategory: null,
	isLoading: false,
	isInitialized: false,
	storage: new CategoryStorage(),

	initialize: async (userId: number) => {
		if (get().isInitialized) return;
		set({ isLoading: true });
		try {
			await get().storage.initializeCategoryDb();
			const categories = await get().storage.getAllCategories(userId);
			set({ categories, isInitialized: true, isLoading: false });
		} catch (error) {
			console.error(CATEGORY_ERRORS.INIT_STORE, error);
			set({ isLoading: false, isInitialized: true });
		}
	},

	loadCategories: async (userId: number) => {
		set({ isLoading: true });
		try {
			const categories = await get().storage.getAllCategories(userId);
			set({ categories, isLoading: false });
		} catch (error) {
			console.error(CATEGORY_ERRORS.LOAD, error);
			set({ isLoading: false });
			throw error;
		}
	},

	createCategory: async (
		userId: number,
		name: ICategory["name"],
		description?: ICategory["description"]
	) => {
		set({ isLoading: true });
		try {
			const category = await get().storage.createCategory(userId, name, description);
			set((state) => ({
				categories: [...state.categories, category],
				isLoading: false,
			}));
			return category;
		} catch (error) {
			console.error(CATEGORY_ERRORS.CREATE_STORE, error);
			set({ isLoading: false });
			throw error;
		}
	},

	updateCategoryName: async (
		id: number,
		userId: number,
		name: ICategory["name"]
	) => {
		set({ isLoading: true });
		try {
			await get().storage.updateCategoryName(id, userId, name);
			set((state) => ({
				categories: state.categories.map((cat) =>
					cat.id === id ? { ...cat, name } : cat
				),
				currentCategory:
					state.currentCategory?.id === id
						? { ...state.currentCategory, name }
						: state.currentCategory,
				isLoading: false,
			}));
		} catch (error) {
			console.error(CATEGORY_ERRORS.UPDATE_NAME_STORE, error);
			set({ isLoading: false });
			throw error;
		}
	},

	deleteCategory: async (id: number, userId: number) => {
		set({ isLoading: true });
		try {
			await get().storage.deleteCategory(id, userId);
			set((state) => ({
				categories: state.categories.filter((cat) => cat.id !== id),
				currentCategory:
					state.currentCategory?.id === id ? null : state.currentCategory,
				isLoading: false,
			}));
		} catch (error) {
			console.error(CATEGORY_ERRORS.DELETE_STORE, error);
			set({ isLoading: false });
			throw error;
		}
	},

	updateCategoryDescription: async (
		id: number,
		userId: number,
		description?: ICategory["description"]
	) => {
		set({ isLoading: true });
		try {
			await get().storage.updateCategoryDescription(id, userId, description);
			set((state) => ({
				categories: state.categories.map((cat) =>
					cat.id === id ? { ...cat, description } : cat
				),
				currentCategory:
					state.currentCategory?.id === id
						? { ...state.currentCategory, description }
						: state.currentCategory,
				isLoading: false,
			}));
		} catch (error) {
			console.error(CATEGORY_ERRORS.UPDATE_DESCRIPTION_STORE, error);
			set({ isLoading: false });
			throw error;
		}
	},
	setCurrentCategory: (category: ICategory | null) => {
		set({ currentCategory: category });
	},
}));
