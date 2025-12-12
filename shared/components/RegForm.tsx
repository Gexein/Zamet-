import {
	View,
	StyleSheet,
	Alert,
	TextInputChangeEvent,
	Animated,
	Platform,
	ToastAndroid,
} from "react-native";
import { COLORS, FONTSIZE } from "../consts/styles";
import { Input } from "./Input";
import { Button } from "./Button";
import { useEffect, useRef, useState } from "react";
import { Link } from "expo-router";
import { linkTo } from "expo-router/build/global-state/routing";

export type InputRef = {
	focus: () => void;
	blur: () => void;
};

export function RegForm() {
	const [inputValue, setInputValue] = useState<string>("");
	const inputRef = useRef<InputRef>(null);

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

	const showAlert = () => {
		if (inputValue.length < 1) {
			if (Platform.OS === "android") {
				ToastAndroid.showWithGravity(
					"Введите имя в поле ввода 😊",
					ToastAndroid.SHORT,
					ToastAndroid.BOTTOM
				);
			} else {
				Alert.alert("Упс 😊", "Введите имя в поле ввода", [
					{
						text: "Окслейд",
						onPress: () => {
							inputRef.current && inputRef.current.focus();
						},
						style: "cancel",
					},
				]);
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
			</Animated.View>
			<Animated.View
				style={{
					transform: [
						{ translateX: animatedValue.x },
						{ translateY: animatedValue.y },
					],
				}}
			>
				<Button
					disabled={inputValue.length < 1}
					onPress={() => {
						showAlert();
						inputRef.current && inputRef.current.blur();
						if (inputValue.length > 0) {
							linkTo("/");
						}
					}}
				>
					<Animated.Text style={[styles.buttonText, { color: color }]}>
						Начать
					</Animated.Text>
				</Button>
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
