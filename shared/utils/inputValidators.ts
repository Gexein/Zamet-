type TInputValidationResult = {
	isValid: boolean;
	error: {
		isTooShort?: boolean;
		hasNotNumbers?: boolean;
		isNotString?: boolean;
		hasSpaces?: boolean;
	};
	errorContent: string;
};

export const isPasswordValid = (inputValue: string): TInputValidationResult => {
	const result: TInputValidationResult = {
		isValid: true,
		error: {},
		errorContent: "",
	};
	if (typeof inputValue !== "string") {
		result.isValid = false;
		result.error.isNotString = true;
		result.errorContent = "Пароль должен быть строкой";
	}
	if (inputValue.trim().length < 6) {
		result.isValid = false;
		result.error.isTooShort = true;
		result.errorContent = "Пароль должен содержать минимум 6 символов";
	}
	if (!/\d/.test(inputValue)) {
		result.isValid = false;
		result.error.hasNotNumbers = true;
		result.errorContent = "Пароль должен содержать буквы и цифры";
	}
	if (inputValue.includes(" ")) {
		result.isValid = false;
		result.error.hasSpaces = true;
		result.errorContent = "Пароль не должен содержать пробелы";
	}

	return result;
};

export const isNameValid = (inputValue: string): TInputValidationResult => {
	const result: TInputValidationResult = {
		isValid: true,
		error: {},
		errorContent: "",
	};
	if (typeof inputValue !== "string") {
		result.isValid = false;
		result.error.isNotString = true;
		result.errorContent = "Имя пользователя должно быть строкой";
	}
	if (inputValue.trim().length < 2) {
		result.isValid = false;
		result.error.isTooShort = true;
		result.errorContent = "Имя пользователя должно содержать минимум 2 символа";
	}
	if (inputValue.includes(" ")) {
		result.isValid = false;
		result.error.hasSpaces = true;
		result.errorContent = "Имя пользователя не должно содержать пробелы";
	}
	return result;
};
