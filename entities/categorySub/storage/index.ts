import { DataBaseService } from "../../../shared/database";
import { SQL_ACTIONS } from "../../../shared/consts/db";
import { CATEGORY_SUB_ERRORS } from "../../../shared/consts/errors";
import { ICategorySub } from "../types";

export class CategorySubStorage {
	private db: DataBaseService;
	constructor() {
		this.db = new DataBaseService();
	}

	async initializeCategorySubDb(): Promise<void> {
		await this.db.executeSql(`
			${SQL_ACTIONS.CREATE} TABLE IF NOT EXISTS category_subcategories (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				category_id INTEGER NOT NULL,
				name TEXT NOT NULL,
				description TEXT DEFAULT '',
				created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
				updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
				FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
			)
		`);
	}

	async getAllSubcategories(categoryId: number): Promise<ICategorySub[]> {
		const { rows } = await this.db.executeSql<ICategorySub>(
			`${SQL_ACTIONS.SELECT} * FROM category_subcategories WHERE category_id = ? ORDER BY created_at DESC`,
			[categoryId]
		);
		return rows;
	}

	async getSubcategoryById(
		id: number,
		categoryId: number
	): Promise<ICategorySub | null> {
		const { rows } = await this.db.executeSql<ICategorySub>(
			`${SQL_ACTIONS.SELECT} * FROM category_subcategories WHERE id = ? AND category_id = ?`,
			[id, categoryId]
		);
		return rows[0] || null;
	}

	async createSubcategory(
		categoryId: number,
		name: ICategorySub["name"],
		description?: ICategorySub["description"]
	): Promise<ICategorySub> {
		const { insertId } = await this.db.executeSql(
			`${SQL_ACTIONS.INSERT} INTO category_subcategories (category_id, name, description) VALUES (?, ?, ?)`,
			[categoryId, name, description || ""]
		);
		if (!insertId) throw new Error(CATEGORY_SUB_ERRORS.CREATE_FAILED);

		const subcategory = await this.getSubcategoryById(insertId, categoryId);
		if (!subcategory)
			throw new Error(CATEGORY_SUB_ERRORS.CREATE_GET_FAILED);

		return subcategory;
	}

	async updateSubcategoryName(
		id: number,
		categoryId: number,
		name: ICategorySub["name"]
	): Promise<void> {
		const { rowsAffected } = await this.db.executeSql(
			`${SQL_ACTIONS.UPDATE} category_subcategories SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND category_id = ?`,
			[name, id, categoryId]
		);
		if (rowsAffected === 0)
			throw new Error(CATEGORY_SUB_ERRORS.UPDATE_NAME);
	}

	async updateSubcategoryDescription(
		id: number,
		categoryId: number,
		description?: ICategorySub["description"]
	): Promise<void> {
		const { rowsAffected } = await this.db.executeSql(
			`${SQL_ACTIONS.UPDATE} category_subcategories SET description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND category_id = ?`,
			[description || "", id, categoryId]
		);
		if (rowsAffected === 0)
			throw new Error(CATEGORY_SUB_ERRORS.UPDATE_DESCRIPTION);
	}

	async deleteSubcategory(id: number, categoryId: number): Promise<void> {
		const { rowsAffected } = await this.db.executeSql(
			`${SQL_ACTIONS.DELETE} FROM category_subcategories WHERE id = ? AND category_id = ?`,
			[id, categoryId]
		);
		if (rowsAffected === 0) throw new Error(CATEGORY_SUB_ERRORS.DELETE);
	}
}

