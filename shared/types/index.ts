export type TTheme = "light" | "dark";

export type TInputValidationResult = {
	isValid: boolean;
	error: {
		isTooShort?: boolean;
		hasNotNumbers?: boolean;
		isNotString?: boolean;
		hasSpaces?: boolean;
		doesNotExist?: boolean;
	};
	errorContent: string;
};
