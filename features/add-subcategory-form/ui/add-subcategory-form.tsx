import { View, TextInputChangeEvent, Animated } from "react-native";
import type { InputRef } from "../../../shared/components/Input/types";
import { Input } from "../../../shared/components/Input/ui/Input";
import { Button } from "../../../shared/components/Button/ui/Button";
import { COLORS, FORM_STYLES } from "../../../shared/consts/styles";
import {
	isSubcategoryNameValid,
	isSubcategoryDescriptionValid,
	isCategoryIdValid,
} from "../../../shared/utils/inputValidators";
import { useEffect, useRef, useState } from "react";
import { useAppInfoStore } from "../../app-info/store";
import { useCategorySubStore } from "../../../entities/categorySub/store";
import { useRouter } from "expo-router";
import { NAV } from "../../../shared/consts/navigation";
import { CATEGORY_SUB_MESSAGES } from "../../../shared/consts/messages";
import { CATEGORY_SUB_ERRORS } from "../../../shared/consts/errors";
import { getScreenWidth } from "../../../shared/utils/getScreenWidth";

type TProps = {
	categoryId: number | undefined;
};

export function AddSubcategoryForm({ categoryId }: TProps) {
	const [subcategoryName, setSubcategoryName] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const nameInputRef = useRef<InputRef>(null);
	const descriptionInputRef = useRef<InputRef>(null);
	const createSubcategory = useCategorySubStore().createSubcategory;
	const navigate = useRouter();

	const nodesWidth = getScreenWidth(0.75);

	const animatedValue2 = useRef(new Animated.Value(1000)).current;

	const animatedValue3 = useRef(new Animated.Value(100)).current;
	const color = useRef(
		animatedValue3.interpolate({
			inputRange: [0, 100],
			outputRange: [COLORS.colorFg, COLORS.colorBg],
		}),
	).current;

	const onSubmitClick = async () => {
		const nameCheck = isSubcategoryNameValid(subcategoryName);
		const descriptionCheck = isSubcategoryDescriptionValid(description);
		const categoryIdCheck = isCategoryIdValid(categoryId);
		useAppInfoStore.getState().clearMessage();

		if (!nameCheck.isValid) {
			useAppInfoStore.getState().setMessage(nameCheck.errorContent);
		}
		if (!descriptionCheck.isValid) {
			useAppInfoStore.getState().setMessage(descriptionCheck.errorContent);
		}
		if (!categoryIdCheck.isValid) {
			useAppInfoStore.getState().setMessage(categoryIdCheck.errorContent);
			return;
		}
		if (!categoryId) {
			return;
		}
		if (
			nameCheck.isValid &&
			descriptionCheck.isValid &&
			categoryIdCheck.isValid
		) {
			try {
				await createSubcategory(categoryId, subcategoryName, description);
				useAppInfoStore
					.getState()
					.setMessage(CATEGORY_SUB_MESSAGES.CREATE_SUCCESS);
				setSubcategoryName("");
				setDescription("");
				navigate.back();
			} catch (error) {
				const errorMessage =
					error instanceof Error
						? error.message
						: CATEGORY_SUB_ERRORS.CREATE_FAILED;
				useAppInfoStore.getState().setMessage(errorMessage);
			}
		}
	};

	useEffect(() => {
		Animated.timing(animatedValue2, {
			toValue: 0,
			duration: 1000,
			useNativeDriver: true,
		}).start();
	}, []);

	useEffect(() => {
		Animated.timing(animatedValue3, {
			toValue: subcategoryName.length > 2 ? 0 : 100,
			duration: 300,
			useNativeDriver: false,
		}).start();
	}, [subcategoryName]);

	return (
		<View style={FORM_STYLES.form}>
			<Animated.View
				style={{
					transform: [{ translateX: animatedValue2 }],
					...FORM_STYLES.inputsWrapper,
				}}
			>
				<Input
					ref={nameInputRef}
					placeholder="Название подкатегории"
					placeholderTextColor={COLORS.colorBg}
					value={subcategoryName}
					onChange={(event: TextInputChangeEvent) =>
						setSubcategoryName(event.nativeEvent.text)
					}
					setInputValue={setSubcategoryName}
					width={nodesWidth}
				/>
				<Input
					ref={descriptionInputRef}
					placeholder="Описание (опционально)"
					placeholderTextColor={COLORS.colorBg}
					value={description}
					onChange={(event: TextInputChangeEvent) =>
						setDescription(event.nativeEvent.text)
					}
					setInputValue={setDescription}
					width={nodesWidth}
				/>
			</Animated.View>
			<Animated.View
				style={{
					transform: [{ translateX: animatedValue2 }],
				}}
			>
				<Button
					disabled={subcategoryName.length < 3}
					onPress={onSubmitClick}
					width={nodesWidth}
				>
					<Animated.Text style={[FORM_STYLES.buttonText, { color: color }]}>
						Создать
					</Animated.Text>
				</Button>
			</Animated.View>
		</View>
	);
}
