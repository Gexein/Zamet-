import { create } from "zustand";
import { IUser, IUserState } from "../types";
import { UserStorage } from "../storage";
import { useCategoryStore } from "../../category/store";

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
			console.error("Ошибка инициализации UserStore:", error);
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
			console.error("Ошибка сохранения пользователя:", error);
			set({ isLoading: false });
			throw error;
		}
	},
	updateUserName: async (name: IUser["name"]) => {
		set({ isLoading: true });
		try {
			const user = get().user;
			if (!user) throw new Error("Нет пользователя для обновления");
			await get().storage.updateUserName(user.id, name);
			// Обновляем пользователя из БД
			const updatedUser = await get().storage.getUserData();
			if (updatedUser) {
				set({ user: updatedUser, isLoading: false });
			} else {
				set({ isLoading: false });
			}
		} catch (error) {
			console.error("Ошибка обновления имени пользователя:", error);
			set({ isLoading: false });
			throw error;
		}
	},
	updateUserPassword: async (password: IUser["password"]) => {
		set({ isLoading: true });
		try {
			const user = get().user;
			if (!user) throw new Error("Нет пользователя для обновления");
			await get().storage.updateUserPassword(user.id, password);
			// Обновляем пользователя из БД
			const updatedUser = await get().storage.getUserData();
			if (updatedUser) {
				set({ user: updatedUser, isLoading: false });
			} else {
				set({ isLoading: false });
			}
		} catch (error) {
			console.error("Ошибка обновления пароля пользователя:", error);
			set({ isLoading: false });
			throw error;
		}
	},
	updateUserTheme: async (theme: IUser["theme"]) => {
		set({ isLoading: true });
		try {
			const user = get().user;
			if (!user) throw new Error("Нет пользователя для обновления");
			await get().storage.updateUserTheme(user.id, theme);
			// Обновляем пользователя из БД
			const updatedUser = await get().storage.getUserData();
			if (updatedUser) {
				set({ user: updatedUser, isLoading: false });
			} else {
				set({ isLoading: false });
			}
		} catch (error) {
			console.error("Ошибка обновления темы пользователя:", error);
			set({ isLoading: false });
			throw error;
		}
	},
	clearAllData: async () => {
		set({ isLoading: true });
		try {
			await get().storage.clearAllData();
		} catch (error) {
			console.error("Ошибка при удалении данных", error);
			throw error;
		} finally {
			set({ isLoading: false });
		}
	},
}));
