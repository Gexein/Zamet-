import { ICategory } from "../../entities/category/types";

export const NAV = {
	HOME: "/",
	CATEGORIES: "/categories",
	CATEGORY: (categoryId: ICategory["id"]) => `/categories/${categoryId}`,
	ADD_CATEGORY: "/categories/add",
};
