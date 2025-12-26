import {
	TextInput,
	type TextInputProps,
	StyleSheet,
	View,
	Animated,
	Text,
} from "react-native";
import { COLORS, FONTSIZE } from "../../../consts/styles";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { InputRef } from "../types";

export const Input = forwardRef<
	InputRef,
	TextInputProps & {
		setInputValue?: (text: string) => void;
		label?: string;
	}
>((props, ref) => {
	const inputRef = useRef<TextInput>(null);
	const scaleValue = useRef(new Animated.Value(1)).current;
	const scaleIn = () => {
		Animated.timing(scaleValue, {
			toValue: 1.07,
			duration: 100,
			useNativeDriver: true,
		}).start();
	};
	const scaleOut = () => {
		Animated.timing(scaleValue, {
			toValue: 1,
			duration: 100,
			useNativeDriver: true,
		}).start();
	};

	useImperativeHandle(ref, () => ({
		focus: () => {
			inputRef.current && inputRef.current.focus();
			scaleIn();
		},
		blur: () => {
			inputRef.current && inputRef.current.blur();
			scaleOut();
		},
	}));

	return (
		<View style={styles.container}>
			{props.label && <Text style={styles.label}>{props.label}</Text>}
			<Animated.View style={{ transform: [{ scale: scaleValue }] }}>
				<TextInput
					{...props}
					ref={inputRef}
					style={styles.input}
					onFocus={scaleIn}
					onBlur={scaleOut}
				/>
			</Animated.View>
		</View>
	);
});

const styles = StyleSheet.create({
	container: {
		rowGap: 10,
	},
	input: {
		backgroundColor: COLORS.colorDarkLight,
		width: 200,
		color: COLORS.colorFg,
		borderRadius: 5,
		paddingHorizontal: 10,
		fontFamily: "Montserrat-Light",
		fontSize: FONTSIZE.l,
	},

	label: {
		color: COLORS.colorFg,
		fontSize: FONTSIZE.s,
		alignSelf: "flex-start",
		fontFamily: "Montserrat-Thin",
	},
});
