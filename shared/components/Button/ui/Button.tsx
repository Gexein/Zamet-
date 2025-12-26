import {
	Animated,
	Pressable,
	PressableProps,
	StyleProp,
	StyleSheet,
	ViewStyle,
	View,
	GestureResponderEvent,
} from "react-native";
import { COLORS } from '../../../consts/styles';
import { useEffect, useRef } from "react";

export function Button({
	children,
	disabled,
	...props
}: PressableProps & { disabled?: boolean }) {
	const animatedValue = useRef(new Animated.Value(100)).current;
	const scaleValue = useRef(new Animated.Value(1)).current;
	const color = useRef(
		animatedValue.interpolate({
			inputRange: [0, 100],
			outputRange: [COLORS.colorDarkLight, COLORS.colorOrange],
		})
	).current;
	const colorAnimaFunc = useRef(
		Animated.timing(animatedValue, {
			toValue: 0,
			duration: 500,
			useNativeDriver: true,
		})
	).current;

	const colorAnimaReversedFunc = useRef(
		Animated.timing(animatedValue, {
			toValue: 100,
			duration: 500,
			useNativeDriver: true,
		})
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
				style={{ ...styles.button }}
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
		width: 200,
		height: 40,
		color: COLORS.colorFg,
		alignItems: "center",
		justifyContent: "center",
	},
});
