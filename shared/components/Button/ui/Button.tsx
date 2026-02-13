import {
	Animated,
	Pressable,
	PressableProps,
	StyleSheet,
	GestureResponderEvent,
} from "react-native";
import { COLORS } from "../../../consts/styles";
import { useEffect, useRef } from "react";

export function Button({
	children,
	disabled,
	width,
	...props
}: PressableProps & { disabled?: boolean; width?: number }) {
	const animatedValue = useRef(new Animated.Value(100)).current;
	const scaleValue = useRef(new Animated.Value(1)).current;
	const color = useRef(
		animatedValue.interpolate({
			inputRange: [0, 100],
			outputRange: [COLORS.colorDarkLight, COLORS.colorOrange],
		}),
	).current;
	const colorAnimaFunc = useRef(
		Animated.timing(animatedValue, {
			toValue: 0,
			duration: 500,
			useNativeDriver: true,
		}),
	).current;

	const colorAnimaReversedFunc = useRef(
		Animated.timing(animatedValue, {
			toValue: 100,
			duration: 500,
			useNativeDriver: true,
		}),
	).current;

	const scaleIn = (e: GestureResponderEvent) => {
		Animated.timing(scaleValue, {
			toValue: 0.85,
			duration: 100,
			useNativeDriver: true,
		}).start();
		props.onPressIn && props.onPressIn(e);
	};
	const scaleOut = (e: GestureResponderEvent) => {
		Animated.timing(scaleValue, {
			toValue: 1,
			duration: 100,
			useNativeDriver: true,
		}).start();
		props.onPressOut && props.onPressOut(e);
	};
	useEffect(() => {
		if (disabled) {
			colorAnimaFunc.start();
		} else if (!disabled) {
			colorAnimaReversedFunc.start();
		}
	}, [disabled]);

	return (
		<Animated.View
			style={{
				backgroundColor: color,
				borderRadius: 5,
				transform: [{ scale: scaleValue }],
			}}
		>
			<Pressable
				{...props}
				style={{...styles.button, width: width ? width : 200}}
				onPressOut={scaleOut}
				onPressIn={scaleIn}
			>
				{children}
			</Pressable>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	button: {
		height: 40,
		color: COLORS.colorFg,
		alignItems: "center",
		justifyContent: "center",
	},
});
