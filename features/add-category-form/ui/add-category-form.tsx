import { View,  TextInputChangeEvent, Animated } from "react-native";
import type { InputRef } from "../../../shared/components/Input/types";
import { Input } from "../../../shared/components/Input/ui/Input";
import { Button } from "../../../shared/components/Button/ui/Button";
import { COLORS, FORM_STYLES } from "../../../shared/consts/styles";
import {
	isCategoryDescriptionValid,
	isCategoryNameValid,
	isUserIdValid,
} from "../../../shared/utils/inputValidators";
import { useEffect, useRef, useState } from "react";
import { useUserStore } from "../../../entities/user/store";
import { useAppInfoStore } from "../../app-info/store";
import { useCategoryStore } from "../../../entities/category/store";
import { useRouter } from "expo-router";
import { NAV } from "../../../shared/consts/navigation";
import { CATEGORY_MESSAGES } from "../../../shared/consts/messages";
import { CATEGORY_ERRORS } from "../../../shared/consts/errors";
import { getScreenWidth } from "../../../shared/utils/getScreenWidth";

export function AddCategoryForm() {
	const [categoryName, setCategoryName] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const categoryInputRef = useRef<InputRef>(null);
	const descriptionInputRef = useRef<InputRef>(null);
	const register = useCategoryStore().createCategory;
	const userId = useUserStore.getState().user?.id;
	const navigate = useRouter();

	const nodesWidth = getScreenWidth(0.75)

	const animatedValue = useRef(
		new Animated.ValueXY({
			x: -1000,
			y: 0,
		}),
	).current;

	const animatedValue2 = useRef(new Animated.Value(1000)).current;

	const animatedValue3 = useRef(new Animated.Value(100)).current;
	const color = useRef(
		animatedValue3.interpolate({
			inputRange: [0, 100],
			outputRange: [COLORS.colorFg, COLORS.colorBg],
		}),
	).current;

	const onSubmitClick = async () => {
		const categoryNameCheck = isCategoryNameValid(categoryName);
		const categoryDescriptionCheck = isCategoryDescriptionValid(description);
		const userCheck = isUserIdValid(userId);
		useAppInfoStore.getState().clearMessage();

		if (!categoryNameCheck.isValid) {
			useAppInfoStore.getState().setMessage(categoryNameCheck.errorContent);
		}
		if (!categoryDescriptionCheck.isValid) {
			useAppInfoStore
				.getState()
				.setMessage(categoryDescriptionCheck.errorContent);
		}
		if (!userCheck.isValid) {
			useAppInfoStore.getState().setMessage(userCheck.errorContent);
			navigate.push(NAV.HOME);
			return;
		}
		if (!userId) {
			return;
		}
		if (
			categoryNameCheck.isValid &&
			categoryDescriptionCheck.isValid &&
			userCheck.isValid
		) {
			try {
				await register(userId, categoryName, description);
				useAppInfoStore.getState().setMessage(CATEGORY_MESSAGES.CREATE_SUCCESS);
				setCategoryName('');
				setDescription('');
				navigate.replace(NAV.CATEGORIES);
			} catch (error) {
				const errorMessage =
					error instanceof Error
						? error.message
						: CATEGORY_ERRORS.CREATE_FAILED;
				useAppInfoStore.getState().setMessage(errorMessage);
			}
		}
	};

	useEffect(() => {
		Animated.parallel([
			Animated.timing(animatedValue, {
				toValue: {
					x: 0,
					y: 0,
				},
				duration: 1000,
				useNativeDriver: true,
			}),
			Animated.timing(animatedValue2, {
				toValue: 0,
				duration: 1000,
				useNativeDriver: true,
			}),
		]).start();
	}, []);

	useEffect(() => {
		Animated.timing(animatedValue3, {
			toValue: categoryName.length > 2 ? 0 : 100,
			duration: 300,
			useNativeDriver: false,
		}).start();
	}, [categoryName]);

	return (
		<View style={FORM_STYLES.form}>
			<Animated.View
				style={{
					transform: [{ translateX: animatedValue2 }], ...FORM_STYLES.inputsWrapper
				}}
			>
				<Input
					ref={categoryInputRef}
					placeholder="Название категории"
					placeholderTextColor={COLORS.colorBg}
					value={categoryName}
					onChange={(event: TextInputChangeEvent) =>
						setCategoryName(event.nativeEvent.text)
					}
					setInputValue={setCategoryName}
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
				<Button disabled={categoryName.length < 3} onPress={onSubmitClick} width={nodesWidth}>
					<Animated.Text style={[FORM_STYLES.buttonText, { color: color }]}>
						Создать
					</Animated.Text>
				</Button>
			</Animated.View>
		</View>
	);
}


