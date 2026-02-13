import { View, TextInputChangeEvent, Animated } from "react-native";
import type { InputRef } from "../../../shared/components/Input/types";
import { Input } from "../../../shared/components/Input/ui/Input";
import { Button } from "../../../shared/components/Button/ui/Button";
import { COLORS, FORM_STYLES} from "../../../shared/consts/styles";
import {
	isNameValid,
	isPasswordValid,
} from "../../../shared/utils/inputValidators";
import { useEffect, useRef, useState } from "react";
import { useUserStore } from "../../../entities/user/store";
import { useAppInfoStore } from "../../app-info/store";
import { USER_MESSAGES } from "../../../shared/consts/messages";
import { USER_ERRORS } from "../../../shared/consts/errors";
import { getScreenWidth } from "../../../shared/utils/getScreenWidth";

export function RegForm() {
	const [inputValue, setInputValue] = useState<string>("");
	const [passwordValue, setPasswordValue] = useState<string>("");
	const inputRef = useRef<InputRef>(null);
	const passwordInputRef = useRef<InputRef>(null);
	const register = useUserStore().createUser;

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
		const nameCheck = isNameValid(inputValue);
		const passwordCheck = isPasswordValid(passwordValue);
		useAppInfoStore.getState().clearMessage();

		if (!nameCheck.isValid) {
			useAppInfoStore.getState().setMessage(nameCheck.errorContent);
		}
		if (!passwordCheck.isValid) {
			useAppInfoStore.getState().setMessage(passwordCheck.errorContent);
		}
		if (nameCheck.isValid && passwordCheck.isValid) {
			try {
				await register(inputValue, passwordValue);
				useAppInfoStore.getState().setMessage(USER_MESSAGES.CREATE_SUCCESS);
			} catch (error) {
				const errorMessage =
					error instanceof Error
						? error.message
						: USER_ERRORS.CREATE_FAILED;
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
			toValue: inputValue.length > 1 && passwordValue.length > 5 ? 0 : 100,
			duration: 300,
			useNativeDriver: false,
		}).start();
	}, [inputValue, passwordValue]);

	return (
		<View style={FORM_STYLES.form}>
			<Animated.View
				style={{
					transform: [{ translateX: animatedValue2 }], ...FORM_STYLES.inputsWrapper
				}}
			>
				<Input
					ref={inputRef}
					placeholder="Ваше имя"
					placeholderTextColor={COLORS.colorBg}
					value={inputValue}
					onChange={(event: TextInputChangeEvent) =>
						setInputValue(event.nativeEvent.text)
					}
					setInputValue={setInputValue}
					width={nodesWidth}
				/>
				<Input
					ref={passwordInputRef}
					placeholder="Придумайте пароль"
					placeholderTextColor={COLORS.colorBg}
					value={passwordValue}
					onChange={(event: TextInputChangeEvent) =>
						setPasswordValue(event.nativeEvent.text)
					}
					setInputValue={setPasswordValue}
					width={nodesWidth}
				/>
			</Animated.View>
			<Animated.View
				style={{
					transform: [{ translateX: animatedValue2 }],
				}}
			>
				<Button
					disabled={inputValue.length < 2 || passwordValue.length < 6}
					onPress={onSubmitClick}
					width={nodesWidth}
				>
					<Animated.Text style={[FORM_STYLES.buttonText, { color: color }]}>
						Начать
					</Animated.Text>
				</Button>
			</Animated.View>
		</View>
	);
}

