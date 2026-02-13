import * as SQlite from "expo-sqlite";
import { SQL_ACTIONS } from "../consts/db";
import { DB_ERRORS } from "../consts/errors";

export class DataBaseService {
	private db: SQlite.SQLiteDatabase | null = null;
	constructor() {}
	async initializeDb(): Promise<void> {
		if (this.db) return;
		console.log("Процесс открытия базы данных");
		this.db = await SQlite.openDatabaseAsync("app.db");
		console.log("База данных открыта");
	}
	async executeSql<T>(
		sql: string,
		params: any[] = [],
	): Promise<{ rows: T[]; insertId?: number; rowsAffected: number }> {
		if (!this.db) {
			await this.initializeDb();
		}
		const sqlQueryUppercased = sql.trim().toUpperCase();
		if (!this.db) {
			console.error(DB_ERRORS.EXECUTE_SQL_DB_NULL);
			return { rows: [], rowsAffected: 0 };
		}
		try {
			if (sqlQueryUppercased.startsWith(SQL_ACTIONS.SELECT)) {
				const rows = await this.db.getAllAsync<T>(sql, params);
				return { rows, rowsAffected: 0 };
			} else if (sqlQueryUppercased.startsWith(SQL_ACTIONS.INSERT)) {
				const result = await this.db.runAsync(sql, params);
				return {
					rows: [],
					insertId: Number(result.lastInsertRowId),
					rowsAffected: result.changes,
				};
			} else if (
				sqlQueryUppercased.startsWith(SQL_ACTIONS.UPDATE) ||
				sqlQueryUppercased.startsWith(SQL_ACTIONS.DELETE)
			) {
				const result = await this.db.runAsync(sql, params);
				return { rows: [], rowsAffected: result.changes };
			} else {
				await this.db.execAsync(sql);
				return { rows: [], rowsAffected: 0 };
			}
		} catch (error) {
			console.error(DB_ERRORS.EXECUTE_SQL_QUERY, sql, params, "error: ", error);
			throw error;
		}
	}
	async clearTable(tableName: string): Promise<void> {
		if (!this.db) {
			await this.initializeDb();
		}

		try {
			if (!this.db) {
				throw new Error(DB_ERRORS.DB_NOT_FOUND);
			}
			await this.db.execAsync(`DELETE FROM ${tableName}`);
			console.log(`Таблица "${tableName}" очищена`);
		} catch (error) {
			console.error(DB_ERRORS.CLEAR_TABLE(tableName), error);
			throw error;
		}
	}
	async getAllTables(): Promise<string[]> {
		if (!this.db) {
			await this.initializeDb();
		}
		try {
			if (!this.db) {
				throw new Error(DB_ERRORS.DB_NOT_FOUND);
			}
			const result = await this.db?.getAllAsync<{ name: string }>(
				`${SQL_ACTIONS.SELECT} name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'`,
			);
			return result.map((row) => row.name);
		} catch (error) {
			console.error(DB_ERRORS.GET_TABLES);
			return [];
		}
	}
	async clearAllTables(): Promise<void> {
		const tables = await this.getAllTables();
		for (const table of tables) {
			try {
				await this.clearTable(table);
			} catch (error) {
				console.warn(DB_ERRORS.CLEAR_TABLE_FAILED(table));
			}
		}
		console.log("Все таблицы очищены");
	}
}
