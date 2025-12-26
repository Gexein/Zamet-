import { View, StyleSheet, TextInputChangeEvent, Animated } from "react-native";
import type { InputRef } from "../../../shared/components/Input/types";
import { Input } from "../../../shared/components/Input/ui/Input";
import { Button } from "../../../shared/components/Button/ui/Button";
import { COLORS, FONTSIZE } from "../../../shared/consts/styles";
import {
	isNameValid,
	isPasswordValid,
} from "../../../shared/utils/inputValidators";
import { useEffect, useRef, useState } from "react";
import { useUserStore } from "../../../entities/user/store";
import { useAppInfoStore } from "../../app-info/store";

export function RegForm() {
	const [inputValue, setInputValue] = useState<string>("");
	const [passwordValue, setPasswordValue] = useState<string>("");
	const inputRef = useRef<InputRef>(null);
	const passwordInputRef = useRef<InputRef>(null);
	const register = useUserStore().createUser;

	const animatedValue = useRef(
		new Animated.ValueXY({
			x: -1000,
			y: 0,
		})
	).current;

	const animatedValue2 = useRef(new Animated.Value(1000)).current;

	const animatedValue3 = useRef(new Animated.Value(100)).current;
	const color = useRef(
		animatedValue3.interpolate({
			inputRange: [0, 100],
			outputRange: [COLORS.colorFg, COLORS.colorBg],
		})
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
			} catch (error) {
				const errorMessage =
					error instanceof Error
						? error.message
						: "Не удалось создать пользователя";
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
			toValue: inputValue.length > 0 ? 0 : 100,
			duration: 300,
			useNativeDriver: false,
		}).start();
	}, [inputValue]);

	return (
		<View style={styles.form}>
			<Animated.View
				style={{
					transform: [{ translateX: animatedValue2 }],
				}}
			>
				<Input
					ref={inputRef}
					label="Введите имя"
					placeholder="Имя"
					placeholderTextColor={COLORS.colorBg}
					value={inputValue}
					onChange={(event: TextInputChangeEvent) =>
						setInputValue(event.nativeEvent.text)
					}
					setInputValue={setInputValue}
				/>
				<Input
					ref={passwordInputRef}
					label="Введите пароль"
					placeholder="Пароль"
					placeholderTextColor={COLORS.colorBg}
					value={passwordValue}
					onChange={(event: TextInputChangeEvent) =>
						setPasswordValue(event.nativeEvent.text)
					}
					setInputValue={setPasswordValue}
				/>
			</Animated.View>
			<Animated.View
				style={{
					transform: [{ translateX: animatedValue2 }],
				}}
			>
				<Button
					disabled={inputValue.length < 1 || passwordValue.length < 1}
					onPress={onSubmitClick}
				>
					<Animated.Text style={[styles.buttonText, { color: color }]}>
						Начать
					</Animated.Text>
				</Button>
				{/* <Text>
					И тут нужно будет выбрать тему, светлая или темная. Будет радио
					"Оставить темную тему" / "Переключиться на светлую тему" .Здесь будет
					радио с 2 вариантами . "Использовать пароль для входа в приложение" /
					"Использовать пароль только для сброса / изменения личных данных"
				</Text> */}
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	form: {
		rowGap: 25,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonText: {
		fontSize: FONTSIZE.xl,
		fontFamily: "Montserrat",
	},
});
