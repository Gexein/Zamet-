import { SqlActions } from "../../../shared/consts/db";
import { DataBaseService } from "../../../shared/database";
import { ICategory } from "../types";

export class CategoryStorage {
	private db: DataBaseService;
	constructor() {
		this.db = new DataBaseService();
	}
	
	async initializeCategoryDb(): Promise<void> {
		await this.db.executeSql(`
			${SqlActions.CREATE} TABLE IF NOT EXISTS categories (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				user_id INTEGER NOT NULL,
				name TEXT NOT NULL,
				description TEXT DEFAULT '',
				created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
				updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
				FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
			)
		`);
	}
	
	async getAllCategories(userId: number): Promise<ICategory[]> {
		const { rows } = await this.db.executeSql<ICategory>(
			`${SqlActions.SELECT} * FROM categories WHERE user_id = ? ORDER BY created_at DESC`,
			[userId]
		);
		return rows;
	}
	
	async getCategoryById(id: number, userId: number): Promise<ICategory | null> {
		const { rows } = await this.db.executeSql<ICategory>(
			`${SqlActions.SELECT} * FROM categories WHERE id = ? AND user_id = ?`,
			[id, userId]
		);
		return rows[0] || null;
	}
	
	async createCategory(
		userId: number,
		name: ICategory["name"],
		description?: ICategory["description"]
	): Promise<ICategory> {
		const { insertId } = await this.db.executeSql(
			`${SqlActions.INSERT} INTO categories (user_id, name, description) VALUES (?, ?, ?)`,
			[userId, name, description || '']
		);
		if (!insertId) throw new Error("Не удалось создать категорию");
		
		const category = await this.getCategoryById(insertId, userId);
		if (!category) throw new Error("Не удалось получить созданную категорию");
		
		return category;
	}
	
	async updateCategoryName(id: number, userId: number, name: ICategory["name"]): Promise<void> {
		const { rowsAffected } = await this.db.executeSql(
			`${SqlActions.UPDATE} categories SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?`,
			[name, id, userId]
		);
		if (rowsAffected === 0) throw new Error("Не удалось обновить имя категории");
	}
	
	async updateCategoryDescription(
		id: number,
		userId: number,
		description?: ICategory["description"]
	): Promise<void> {
		const { rowsAffected } = await this.db.executeSql(
			`${SqlActions.UPDATE} categories SET description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?`,
			[description || '', id, userId]
		);
		if (rowsAffected === 0) throw new Error("Не удалось обновить описание категории");
	}
	
	async deleteCategory(id: number, userId: number): Promise<void> {
		const { rowsAffected } = await this.db.executeSql(
			`${SqlActions.DELETE} FROM categories WHERE id = ? AND user_id = ?`,
			[id, userId]
		);
		if (rowsAffected === 0) throw new Error("Не удалось удалить категорию");
	}
}