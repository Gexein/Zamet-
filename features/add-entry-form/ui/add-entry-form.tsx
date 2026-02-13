import { View, TextInputChangeEvent, Animated } from "react-native";
import type { InputRef } from "../../../shared/components/Input/types";
import { Input } from "../../../shared/components/Input/ui/Input";
import { Button } from "../../../shared/components/Button/ui/Button";
import { COLORS, FORM_STYLES } from "../../../shared/consts/styles";
import {
	isEntryNameValid,
	isEntryDescriptionValid,
	isSubcategoryIdValid,
} from "../../../shared/utils/inputValidators";
import { useEffect, useRef, useState } from "react";
import { useAppInfoStore } from "../../app-info/store";
import { useEntryStore } from "../../../entities/entry/store";
import { useRouter } from "expo-router";
import { ENTRY_MESSAGES } from "../../../shared/consts/messages";
import { ENTRY_ERRORS } from "../../../shared/consts/errors";
import { getScreenWidth } from "../../../shared/utils/getScreenWidth";

type TProps = {
	categorySubId: number | undefined;
};

export function AddEntryForm({ categorySubId }: TProps) {
	const [entryName, setEntryName] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const nameInputRef = useRef<InputRef>(null);
	const descriptionInputRef = useRef<InputRef>(null);
	const createEntry = useEntryStore().createEntry;
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
		const nameCheck = isEntryNameValid(entryName);
		const descriptionCheck = isEntryDescriptionValid(description);
		const subcategoryIdCheck = isSubcategoryIdValid(categorySubId);
		useAppInfoStore.getState().clearMessage();

		if (!nameCheck.isValid) {
			useAppInfoStore.getState().setMessage(nameCheck.errorContent);
		}
		if (!descriptionCheck.isValid) {
			useAppInfoStore.getState().setMessage(descriptionCheck.errorContent);
		}
		if (!subcategoryIdCheck.isValid) {
			useAppInfoStore.getState().setMessage(subcategoryIdCheck.errorContent);
			return;
		}
		if (!categorySubId) {
			return;
		}
		if (
			nameCheck.isValid &&
			descriptionCheck.isValid &&
			subcategoryIdCheck.isValid
		) {
			try {
				await createEntry(categorySubId, entryName || undefined, description);
				useAppInfoStore
					.getState()
					.setMessage(ENTRY_MESSAGES.CREATE_SUCCESS);
				setEntryName("");
				setDescription("");
				navigate.back();
			} catch (error) {
				const errorMessage =
					error instanceof Error
						? error.message
						: ENTRY_ERRORS.CREATE_FAILED;
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
			toValue: description.length > 1 ? 0 : 100,
			duration: 300,
			useNativeDriver: false,
		}).start();
	}, [description]);

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
					placeholder="Заголовок (опционально)"
					placeholderTextColor={COLORS.colorBg}
					value={entryName}
					onChange={(event: TextInputChangeEvent) =>
						setEntryName(event.nativeEvent.text)
					}
					setInputValue={setEntryName}
					width={nodesWidth}
				/>
				<Input
					ref={descriptionInputRef}
					placeholder="Запись"
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
					disabled={description.length < 2}
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
