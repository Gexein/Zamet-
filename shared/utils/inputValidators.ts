import { IUser } from "../../entities/user/types";
import type { TInputValidationResult } from "../types";
import { USER_ERRORS, VALIDATION_ERRORS } from "../consts/errors";

export const isPasswordValid = (inputValue: string): TInputValidationResult => {
	const result: TInputValidationResult = {
		isValid: true,
		error: {},
		errorContent: "",
	};
	if (typeof inputValue !== "string") {
		result.isValid = false;
		result.error.isNotString = true;
		result.errorContent = VALIDATION_ERRORS.PASSWORD_NOT_STRING;
	}
	if (inputValue.trim().length < 6) {
		result.isValid = false;
		result.error.isTooShort = true;
		result.errorContent = VALIDATION_ERRORS.PASSWORD_TOO_SHORT;
	}
	if (!/\d/.test(inputValue)) {
		result.isValid = false;
		result.error.hasNotNumbers = true;
		result.errorContent = VALIDATION_ERRORS.PASSWORD_NO_NUMBERS;
	}
	if (inputValue.includes(" ")) {
		result.isValid = false;
		result.error.hasSpaces = true;
		result.errorContent = VALIDATION_ERRORS.PASSWORD_HAS_SPACES;
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
		result.errorContent = VALIDATION_ERRORS.NAME_NOT_STRING;
	}
	if (inputValue.trim().length < 2) {
		result.isValid = false;
		result.error.isTooShort = true;
		result.errorContent = VALIDATION_ERRORS.NAME_TOO_SHORT;
	}
	if (inputValue.includes(" ")) {
		result.isValid = false;
		result.error.hasSpaces = true;
		result.errorContent = VALIDATION_ERRORS.NAME_HAS_SPACES;
	}
	return result;
};

export const isCategoryNameValid = (
	inputValue: string,
): TInputValidationResult => {
	const result: TInputValidationResult = {
		isValid: true,
		error: {},
		errorContent: "",
	};
	if (typeof inputValue !== "string") {
		result.isValid = false;
		result.error.isNotString = true;
		result.errorContent = VALIDATION_ERRORS.CATEGORY_NAME_NOT_STRING;
	}
	if (inputValue.trim().length < 3) {
		result.isValid = false;
		result.error.isTooShort = true;
		result.errorContent = VALIDATION_ERRORS.CATEGORY_NAME_TOO_SHORT;
	}

	return result;
};

export const isCategoryDescriptionValid = (
	inputValue: string,
): TInputValidationResult => {
	const result: TInputValidationResult = {
		isValid: true,
		error: {},
		errorContent: "",
	};
	if (typeof inputValue !== "string") {
		result.isValid = false;
		result.error.isNotString = true;
		result.errorContent = VALIDATION_ERRORS.CATEGORY_DESCRIPTION_NOT_STRING;
	}

	return result;
};

export const isSubcategoryNameValid = (
	inputValue: string,
): TInputValidationResult => {
	const result: TInputValidationResult = {
		isValid: true,
		error: {},
		errorContent: "",
	};
	if (typeof inputValue !== "string") {
		result.isValid = false;
		result.error.isNotString = true;
		result.errorContent = VALIDATION_ERRORS.SUBCATEGORY_NAME_NOT_STRING;
	}
	if (inputValue.trim().length < 3) {
		result.isValid = false;
		result.error.isTooShort = true;
		result.errorContent = VALIDATION_ERRORS.SUBCATEGORY_NAME_TOO_SHORT;
	}
	return result;
};

export const isSubcategoryDescriptionValid = (
	inputValue: string,
): TInputValidationResult => {
	const result: TInputValidationResult = {
		isValid: true,
		error: {},
		errorContent: "",
	};
	if (typeof inputValue !== "string") {
		result.isValid = false;
		result.error.isNotString = true;
		result.errorContent = VALIDATION_ERRORS.SUBCATEGORY_DESCRIPTION_NOT_STRING;
	}
	return result;
};

export const isEntryNameValid = (
	inputValue: string,
): TInputValidationResult => {
	const result: TInputValidationResult = {
		isValid: true,
		error: {},
		errorContent: "",
	};
	if (typeof inputValue !== "string") {
		result.isValid = false;
		result.error.isNotString = true;
		result.errorContent = VALIDATION_ERRORS.ENTRY_NAME_NOT_STRING;
	}
	return result;
};

export const isEntryDescriptionValid = (
	inputValue: string,
): TInputValidationResult => {
	const result: TInputValidationResult = {
		isValid: true,
		error: {},
		errorContent: "",
	};
	if (typeof inputValue !== "string") {
		result.isValid = false;
		result.error.isNotString = true;
		result.errorContent = VALIDATION_ERRORS.ENTRY_DESCRIPTION_NOT_STRING;
	}
	if (inputValue.trim().length < 2) {
		result.isValid = false;
		result.error.isTooShort = true;
		result.errorContent = VALIDATION_ERRORS.ENTRY_DESCRIPTION_TOO_SHORT;
	}
	return result;
};

export const isCategoryIdValid = (
	categoryId: number | undefined | null,
): TInputValidationResult => {
	const result: TInputValidationResult = {
		isValid: true,
		error: {},
		errorContent: "",
	};
	if (!categoryId) {
		result.isValid = false;
		result.error.doesNotExist = true;
		result.errorContent = VALIDATION_ERRORS.CATEGORY_ID_REQUIRED;
	}
	return result;
};

export const isSubcategoryIdValid = (
	subcategoryId: number | undefined | null,
): TInputValidationResult => {
	const result: TInputValidationResult = {
		isValid: true,
		error: {},
		errorContent: "",
	};
	if (!subcategoryId) {
		result.isValid = false;
		result.error.doesNotExist = true;
		result.errorContent = VALIDATION_ERRORS.SUBCATEGORY_ID_REQUIRED;
	}
	return result;
};

export const isUserIdValid = (
	userId: IUser["id"] | undefined | null,
): TInputValidationResult => {
	const result: TInputValidationResult = {
		isValid: true,
		error: {},
		errorContent: "",
	};
	if (!userId) {
		result.isValid = false;
		result.error.doesNotExist = true;
		result.errorContent = USER_ERRORS.AUTH_REQUIRED;
	}
	return result;
};
