import { SqlActions } from "../../../shared/consts/db";
import { DataBaseService } from "../../../shared/database";
import { IUser } from "../types";

export class UserStorage {
	private db: DataBaseService;
	private initializationPromise: Promise<void> | null = null;
	constructor() {
		this.db = new DataBaseService();
		this.initializeUserDb().catch((error) => {
			console.error("Ошибка инициализации БД:", error);
		});
	}

	async initializeUserDb(): Promise<void> {
		await this.db.executeSql(`
      ${SqlActions.CREATE} TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
		password TEXT NOT NULL,
        theme TEXT DEFAULT 'dark',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
	}
	async clearAllData(): Promise<void> {
		await this.db.clearAllTables();
	}
	async getUserData(): Promise<IUser | null> {
		const { rows } = await this.db.executeSql<IUser>(
			`${SqlActions.SELECT} * FROM users LIMIT 1`
		);
		return rows[0] || null;
	}

	async createUserData(
		name: IUser["name"],
		password: IUser["password"],
		theme: IUser["theme"]
	): Promise<IUser> {
		const { insertId } = await this.db.executeSql(
			`${SqlActions.INSERT} INTO users (name, theme, password) VALUES (?, ?, ?)`,
			[name, theme, password]
		);
		if (!insertId) throw new Error("Не удалось создать пользователя");
		return {
			id: insertId,
			name,
			password,
			theme,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		};
	}

	async updateUserName(id: IUser["id"], name: IUser["name"]): Promise<void> {
		const { rowsAffected } = await this.db.executeSql(
			`${SqlActions.UPDATE} users SET name = ? WHERE id = ?`,
			[name, id]
		);
		if (rowsAffected === 0)
			throw new Error("Не удалось обновить имя пользователя");
	}

	async updateUserPassword(
		id: IUser["id"],
		password: IUser["password"]
	): Promise<void> {
		const { rowsAffected } = await this.db.executeSql(
			`${SqlActions.UPDATE} users SET password = ? WHERE id = ?`,
			[password, id]
		);
		if (rowsAffected === 0)
			throw new Error("Не удалось обновить пароль пользователя");
	}

	async updateUserTheme(id: IUser["id"], theme: IUser["theme"]): Promise<void> {
		const { rowsAffected } = await this.db.executeSql(
			`${SqlActions.UPDATE} users SET theme = ? WHERE id = ?`,
			[theme, id]
		);
		if (rowsAffected === 0)
			throw new Error("Не удалось обновить тему пользователя");
	}
}
