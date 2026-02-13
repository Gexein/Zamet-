import { create } from "zustand";
import { IUser, IUserState } from "../types";
import { UserStorage } from "../storage";
import { USER_ERRORS } from "../../../shared/consts/errors";
import { useCategoryStore } from "../../category/store";
import { useCategorySubStore } from "../../categorySub/store";
import { useEntryStore } from "../../entry/store";

export const useUserStore = create<IUserState>((set, get) => ({
	user: null,
	isLoading: false,
	isInitialized: false,
	storage: new UserStorage(),

	initialize: async () => {
		if (get().isInitialized) return;
		set({ isLoading: true });
		try {
			await get().storage.initializeUserDb();
			await useCategoryStore.getState().storage.initializeCategoryDb();
			await useCategorySubStore.getState().storage.initializeCategorySubDb();
			await useEntryStore.getState().storage.initializeEntryDb();

			const user = await get().storage.getUserData();

			if(user) {
				await useCategoryStore.getState().initialize(user.id);
			}
			set({ user, isInitialized: true, isLoading: false });
			console.log(
				"UserStore инициализирован:",
				user ? "Пользователь найден" : "Нет пользователя"
			);
		} catch (error) {
			console.error(USER_ERRORS.INIT_STORE, error);
			set({ isLoading: false, isInitialized: true });
		}
	},

	createUser: async (
		name: IUser["name"],
		password: IUser["password"],
		optionalTheme: IUser["theme"] = "dark"
	) => {
		set({ isLoading: true });
		try {
			
			const user = await get().storage.createUserData(
				name,
				password,
				optionalTheme
			);
			set({ user, isLoading: false });
		} catch (error) {
			console.error(USER_ERRORS.SAVE_FAILED, error);
			set({ isLoading: false });
			throw error;
		}
	},
	updateUserName: async (name: IUser["name"]) => {
		set({ isLoading: true });
		try {
			const user = get().user;
			if (!user) throw new Error(USER_ERRORS.NOT_FOUND);
			await get().storage.updateUserName(user.id, name);
			const updatedUser = await get().storage.getUserData();
			if (updatedUser) {
				set({ user: updatedUser, isLoading: false });
			} else {
				set({ isLoading: false });
			}
		} catch (error) {
			console.error(USER_ERRORS.UPDATE_NAME_STORE, error);
			set({ isLoading: false });
			throw error;
		}
	},
	updateUserPassword: async (password: IUser["password"]) => {
		set({ isLoading: true });
		try {
			const user = get().user;
			if (!user) throw new Error(USER_ERRORS.NOT_FOUND);
			await get().storage.updateUserPassword(user.id, password);
			const updatedUser = await get().storage.getUserData();
			if (updatedUser) {
				set({ user: updatedUser, isLoading: false });
			} else {
				set({ isLoading: false });
			}
		} catch (error) {
			console.error(USER_ERRORS.UPDATE_PASSWORD_STORE, error);
			set({ isLoading: false });
			throw error;
		}
	},
	updateUserTheme: async (theme: IUser["theme"]) => {
		set({ isLoading: true });
		try {
			const user = get().user;
			if (!user) throw new Error(USER_ERRORS.NOT_FOUND);
			await get().storage.updateUserTheme(user.id, theme);
			const updatedUser = await get().storage.getUserData();
			if (updatedUser) {
				set({ user: updatedUser, isLoading: false });
			} else {
				set({ isLoading: false });
			}
		} catch (error) {
			console.error(USER_ERRORS.UPDATE_THEME_STORE, error);
			set({ isLoading: false });
			throw error;
		}
	},
	clearAllData: async () => {
		set({ isLoading: true });
		try {
			await get().storage.clearAllData();
		} catch (error) {
			console.error(USER_ERRORS.CLEAR_DATA, error);
			throw error;
		} finally {
			set({ isLoading: false });
		}
	},
}));
