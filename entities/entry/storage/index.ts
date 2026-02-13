import { SQL_ACTIONS } from "../../../shared/consts/db";
import { ENTRY_ERRORS } from "../../../shared/consts/errors";
import { DataBaseService } from "../../../shared/database";
import { IEntry } from "../types";

export class EntryStorage {
	private db: DataBaseService;
	constructor() {
		this.db = new DataBaseService();
	}

	async initializeEntryDb(): Promise<void> {
		await this.db.executeSql(`
			${SQL_ACTIONS.CREATE} TABLE IF NOT EXISTS entries (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				category_sub_id INTEGER NOT NULL,
				name TEXT NOT NULL,
				description TEXT NOT NULL DEFAULT '',
				date TEXT,
				created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
				updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
				FOREIGN KEY (category_sub_id) REFERENCES category_subcategories(id) ON DELETE CASCADE
			)
		`);
	}

	async getAllEntries(categorySubId: number): Promise<IEntry[]> {
		const { rows } = await this.db.executeSql<IEntry>(
			`${SQL_ACTIONS.SELECT} * FROM entries WHERE category_sub_id = ? ORDER BY created_at DESC`,
			[categorySubId]
		);
		return rows;
	}

	async getEntryById(
		id: number,
		categorySubId: number
	): Promise<IEntry | null> {
		const { rows } = await this.db.executeSql<IEntry>(
			`${SQL_ACTIONS.SELECT} * FROM entries WHERE id = ? AND category_sub_id = ?`,
			[id, categorySubId]
		);
		return rows[0] || null;
	}

	async createEntry(
		categorySubId: number,
		name?: IEntry["name"],
		description: IEntry["description"],
		date?: IEntry["date"]
	): Promise<IEntry> {
		const { insertId } = await this.db.executeSql(
			`${SQL_ACTIONS.INSERT} INTO entries (category_sub_id, name, description, date) VALUES (?, ?, ?, ?)`,
			[categorySubId, name || "", description, date || null]
		);
		if (!insertId) throw new Error(ENTRY_ERRORS.CREATE_FAILED);

		if (!name || name.trim().length === 0) {
			const autoName = `Запись#${insertId}`;
			await this.db.executeSql(
				`${SQL_ACTIONS.UPDATE} entries SET name = ? WHERE id = ?`,
				[autoName, insertId]
			);
		}

		const entry = await this.getEntryById(insertId, categorySubId);
		if (!entry) throw new Error(ENTRY_ERRORS.CREATE_GET_FAILED);

		return entry;
	}

	async updateEntryName(
		id: number,
		categorySubId: number,
		name: IEntry["name"]
	): Promise<void> {
		const { rowsAffected } = await this.db.executeSql(
			`${SQL_ACTIONS.UPDATE} entries SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND category_sub_id = ?`,
			[name, id, categorySubId]
		);
		if (rowsAffected === 0) throw new Error(ENTRY_ERRORS.UPDATE_NAME);
	}

	async updateEntryDescription(
		id: number,
		categorySubId: number,
		description: IEntry["description"]
	): Promise<void> {
		const { rowsAffected } = await this.db.executeSql(
			`${SQL_ACTIONS.UPDATE} entries SET description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND category_sub_id = ?`,
			[description, id, categorySubId]
		);
		if (rowsAffected === 0)
			throw new Error(ENTRY_ERRORS.UPDATE_DESCRIPTION);
	}

	async updateEntryDate(
		id: number,
		categorySubId: number,
		date?: IEntry["date"]
	): Promise<void> {
		const { rowsAffected } = await this.db.executeSql(
			`${SQL_ACTIONS.UPDATE} entries SET date = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND category_sub_id = ?`,
			[date || null, id, categorySubId]
		);
		if (rowsAffected === 0) throw new Error(ENTRY_ERRORS.UPDATE_DATE);
	}

	async deleteEntry(id: number, categorySubId: number): Promise<void> {
		const { rowsAffected } = await this.db.executeSql(
			`${SQL_ACTIONS.DELETE} FROM entries WHERE id = ? AND category_sub_id = ?`,
			[id, categorySubId]
		);
		if (rowsAffected === 0) throw new Error(ENTRY_ERRORS.DELETE);
	}
}

