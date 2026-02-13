import {
	TextInput,
	type TextInputProps,
	View,
	Animated,
	Text,
} from "react-native";
import { INPUT_STYLES } from "../../../consts/styles";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { InputRef } from "../types";

export const Input = forwardRef<
	InputRef,
	TextInputProps & {
		setInputValue?: (text: string) => void;
		label?: string;
		width?: number;
	}
>(({ width, ...props }, ref) => {
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
		<View style={INPUT_STYLES.container}>
			{props.label && <Text style={INPUT_STYLES.label}>{props.label}</Text>}
			<Animated.View style={{ transform: [{ scale: scaleValue }] }}>
				<TextInput
					{...props}
					ref={inputRef}
					style={{...INPUT_STYLES.input, width: width ? width : 200}}
					onFocus={scaleIn}
					onBlur={scaleOut}
				/>
			</Animated.View>
		</View>
	);
});


