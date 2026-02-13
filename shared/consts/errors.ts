export const DB_ERRORS = {
	EXECUTE_SQL_DB_NULL:
		"Ошибка в методе exequteSql при обращении к базе данных, this.db = null | undefined",
	EXECUTE_SQL_QUERY:
		"Ошибка в методе exequteSql при работе с базой данных:",
	DB_NOT_FOUND: "Ошибка. База данных не найдена",
	CLEAR_TABLE: (tableName: string) =>
		`Ошибка очистки таблицы "${tableName}":`,
	CLEAR_TABLE_FAILED: (tableName: string) =>
		`Не удалось очистить таблицу "${tableName}"`,
	GET_TABLES: "Ошибка при получении списка таблиц",
} as const;

export const USER_ERRORS = {
	INIT_DB: "Ошибка инициализации БД:",
	INIT_STORE: "Ошибка инициализации UserStore:",
	CREATE_FAILED: "Не удалось создать пользователя",
	SAVE_FAILED: "Ошибка сохранения пользователя:",
	NOT_FOUND: "Нет пользователя для обновления",
	UPDATE_NAME: "Не удалось обновить имя пользователя",
	UPDATE_NAME_STORE: "Ошибка обновления имени пользователя:",
	UPDATE_PASSWORD: "Не удалось обновить пароль пользователя",
	UPDATE_PASSWORD_STORE: "Ошибка обновления пароля пользователя:",
	UPDATE_THEME: "Не удалось обновить тему пользователя",
	UPDATE_THEME_STORE: "Ошибка обновления темы пользователя:",
	CLEAR_DATA: "Ошибка при удалении данных",
	AUTH_REQUIRED: "Нужна авторизация",
} as const;

export const CATEGORY_ERRORS = {
	INIT_STORE: "Ошибка инициализации CategoryStore:",
	LOAD: "Ошибка загрузки категорий:",
	CREATE_FAILED: "Не удалось создать категорию",
	CREATE_GET_FAILED: "Не удалось получить созданную категорию",
	CREATE_STORE: "Ошибка создания категории:",
	UPDATE_NAME: "Не удалось обновить имя категории",
	UPDATE_NAME_STORE: "Ошибка обновления имени категории:",
	UPDATE_DESCRIPTION: "Не удалось обновить описание категории",
	UPDATE_DESCRIPTION_STORE: "Ошибка обновления описания категории:",
	DELETE: "Не удалось удалить категорию",
	DELETE_STORE: "Ошибка удаления категории:",
} as const;

export const CATEGORY_SUB_ERRORS = {
	INIT_STORE: "Ошибка инициализации CategorySubStore:",
	LOAD: "Ошибка загрузки подкатегорий:",
	CREATE_FAILED: "Не удалось создать подкатегорию",
	CREATE_GET_FAILED: "Не удалось получить созданную подкатегорию",
	CREATE_STORE: "Ошибка создания подкатегории:",
	UPDATE_NAME: "Не удалось обновить имя подкатегории",
	UPDATE_NAME_STORE: "Ошибка обновления имени подкатегории:",
	UPDATE_DESCRIPTION: "Не удалось обновить описание подкатегории",
	UPDATE_DESCRIPTION_STORE: "Ошибка обновления описания подкатегории",
	DELETE: "Не удалось удалить подкатегорию",
	DELETE_STORE: "Ошибка удаления подкатегории:",
} as const;

export const VALIDATION_ERRORS = {
	PASSWORD_NOT_STRING: "Пароль должен быть строкой. ",
	PASSWORD_TOO_SHORT: "Пароль должен содержать минимум 6 символов. ",
	PASSWORD_NO_NUMBERS: "Пароль должен содержать буквы и цифры. ",
	PASSWORD_HAS_SPACES: "Пароль не должен содержать пробелы. ",
	NAME_NOT_STRING: "Имя пользователя должно быть строкой. ",
	NAME_TOO_SHORT: "Имя пользователя должно содержать минимум 2 символа. ",
	NAME_HAS_SPACES: "Имя пользователя не должно содержать пробелы. ",
	CATEGORY_NAME_NOT_STRING: "Название категории должно быть строкой. ",
	CATEGORY_NAME_TOO_SHORT: "Название категории должно содержать минимум 3 символа. ",
	CATEGORY_DESCRIPTION_NOT_STRING: "Описание категории должно быть строкой. ",
	SUBCATEGORY_NAME_NOT_STRING: "Название подкатегории должно быть строкой. ",
	SUBCATEGORY_NAME_TOO_SHORT: "Название подкатегории должно содержать минимум 3 символа. ",
	SUBCATEGORY_DESCRIPTION_NOT_STRING: "Описание подкатегории должно быть строкой. ",
	ENTRY_NAME_NOT_STRING: "Название записи должно быть строкой. ",
	ENTRY_NAME_TOO_SHORT: "Название записи должно содержать минимум 2 символа. ",
	ENTRY_DESCRIPTION_NOT_STRING: "Описание записи должно быть строкой. ",
	ENTRY_DESCRIPTION_TOO_SHORT: "Запись должна содержать минимум 2 символа. ",
	CATEGORY_ID_REQUIRED: "Не указана категория. ",
	SUBCATEGORY_ID_REQUIRED: "Не указана подкатегория. ",
} as const;

export const ENTRY_ERRORS = {
	INIT_STORE: "Ошибка инициализации EntryStore:",
	LOAD: "Ошибка загрузки записей:",
	CREATE_FAILED: "Не удалось создать запись",
	CREATE_GET_FAILED: "Не удалось получить созданную запись",
	CREATE_STORE: "Ошибка создания записи:",
	UPDATE_NAME: "Не удалось обновить имя записи",
	UPDATE_NAME_STORE: "Ошибка обновления имени записи:",
	UPDATE_DESCRIPTION: "Не удалось обновить описание записи",
	UPDATE_DESCRIPTION_STORE: "Ошибка обновления содержимого записи",
	UPDATE_DATE: "Не удалось обновить дату записи",
	UPDATE_DATE_STORE: "Ошибка обновления даты записи",
	DELETE: "Не удалось удалить запись",
	DELETE_STORE: "Ошибка удаления записи:",
} as const;
