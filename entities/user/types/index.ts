import { TTheme } from "../../../shared/types";
import { UserStorage } from "../storage";

export interface IUser {
	id: number;
	name: string;
	password: string;
	theme: TTheme;
	created_at: string;
	updated_at: string;
}

export interface IUserState {
	user: IUser | null;
	isLoading: boolean;
	isInitialized: boolean;

	storage: UserStorage;

	initialize: () => Promise<void>;
	createUser: (
		name: IUser["name"],
		password: IUser["password"],
		theme?: IUser["theme"]
	) => Promise<void>;
	updateUserName: (name: IUser["name"]) => Promise<void>;
	updateUserPassword: (password: IUser["password"]) => Promise<void>;
	updateUserTheme: (theme: IUser["theme"]) => Promise<void>;
	clearAllData: () => Promise<void>;
}
