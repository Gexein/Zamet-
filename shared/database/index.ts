import * as SQlite from "expo-sqlite";
import type { SQLiteDatabase } from "expo-sqlite";
import { SqlActions } from "../consts/db";

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
		params: any[] = []
	): Promise<{ rows: T[]; insertId?: number; rowsAffected: number }> {
		if (!this.db) {
			await this.initializeDb();
		}
		const sqlQueryUppercased = sql.trim().toUpperCase();
		if (!this.db) {
			console.error(
				"Ошибка в методе exequteSql при обращении к базе данных, this.db = null | undefined"
			);
			return { rows: [], rowsAffected: 0 };
		}
		try {
			if (sqlQueryUppercased.startsWith(SqlActions.SELECT)) {
				const rows = await this.db.getAllAsync<T>(sql, params);
				return { rows, rowsAffected: 0 };
			} else if (sqlQueryUppercased.startsWith(SqlActions.INSERT)) {
				const result = await this.db.runAsync(sql, params);
				return {
					rows: [],
					insertId: Number(result.lastInsertRowId),
					rowsAffected: result.changes,
				};
			} else if (
				sqlQueryUppercased.startsWith(SqlActions.UPDATE) ||
				sqlQueryUppercased.startsWith(SqlActions.DELETE)
			) {
				const result = await this.db.runAsync(sql, params);
				return { rows: [], rowsAffected: result.changes };
			} else {
				await this.db.execAsync(sql);
				return { rows: [], rowsAffected: 0 };
			}
		} catch (error) {
			console.error(
				"Ошибка в методе exequteSql при работе с базой данных:",
				sql,
				params,
				"error: ",
				error
			);
			throw error;
		}
	}
	async clearTable(tableName: string): Promise<void> {
		if (!this.db) {
			await this.initializeDb();
		}

		try {
			if (!this.db) {
				throw new Error("Ошибка. База данных не найдена");
			}
			await this.db.execAsync(`DELETE FROM ${tableName}`);
			console.log(`Таблица "${tableName}" очищена`);
		} catch (error) {
			console.error(` Ошибка очистки таблицы "${tableName}":`, error);
			throw error;
		}
	}
	async getAllTables(): Promise<string[]> {
		if (!this.db) {
			await this.initializeDb();
		}
		try {
			if (!this.db) {
				throw new Error("Ошибка. База данных не найдена");
			}
			const result = await this.db?.getAllAsync<{ name: string }>(
				`${SqlActions.SELECT} name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'`
			);
			return result.map((row) => row.name);
		} catch (error) {
			console.error("Ошибка при получении списка таблиц ");
			return [];
		}
	}
	async clearAllTables(): Promise<void> {
		const tables = await this.getAllTables();
		for (const table of tables) {
			try {
				await this.clearTable(table);
			} catch (error) {
				console.warn(`Не удалось очистить таблицу "${table}"`);
			}
		}
		console.log("Все таблицы очищены");
	}
}
