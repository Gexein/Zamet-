import { CategoryStorage } from "../storage";

export interface ICategory {
	id: number;
	user_id: number;
	name: string;
	description?: string;
	created_at: string;
	updated_at: string;
}

export interface ICategoryState {
	categories: ICategory[];
	currentCategory: ICategory | null;
	isLoading: boolean;
	isInitialized: boolean;
	storage: CategoryStorage;
	initialize: (userId: number) => Promise<void>;
	loadCategories: (userId: number) => Promise<void>;
	createCategory: (
		userId: number,
		name: ICategory["name"],
		description?: ICategory["description"]
	) => Promise<ICategory>;
	updateCategoryName: (
		id: number,
		userId: number,
		name: ICategory["name"]
	) => Promise<void>;
	updateCategoryDescription: (
		id: number,
		userId: number,
		description?: ICategory["description"]
	) => Promise<void>;
	deleteCategory: (id: number, userId: number) => Promise<void>;
}

