import { CategorySubStorage } from "../storage";

export interface ICategorySub {
	id: number;
	category_id: number;
	name: string;
	description?: string;
	created_at: string;
	updated_at: string;
}

export interface ICategorySubState {
	subcategories: ICategorySub[];
	currentSubcategory: ICategorySub | null;
	isLoading: boolean;
	isInitialized: boolean;
	storage: CategorySubStorage;
	initialize: (categoryId: number) => Promise<void>;
	loadSubcategories: (categoryId: number) => Promise<void>;
	createSubcategory: (
		categoryId: number,
		name: ICategorySub["name"],
		description?: ICategorySub["description"]
	) => Promise<ICategorySub>;
	updateSubcategoryName: (
		id: number,
		categoryId: number,
		name: ICategorySub["name"]
	) => Promise<void>;
	deleteSubcategory: (id: number, categoryId: number) => Promise<void>;
	setCurrentSubcategory: (subcategory: ICategorySub | null) => void;
	updateSubcategoryDescription: (
		id: number,
		categotyId: number,
		description: ICategorySub["description"]
	) => Promise<void>;
}
