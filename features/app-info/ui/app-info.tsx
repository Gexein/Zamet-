import { useEffect, useRef } from "react";
import { Text, Animated, StyleSheet, View } from "react-native";
import { COLORS, FONTSIZE } from "../../../shared/consts/styles";
import { useAppInfoStore } from "../store";

export function AppInfo() {
	const animatedYOffset = useRef(new Animated.Value(-1000)).current;
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const messages = useAppInfoStore((state) => state.messages);
	useEffect(() => {
		if (messages.length > 0) {
			showMessage();
		}
	}, [messages]);
	const showMessage = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		Animated.timing(animatedYOffset, {
			toValue: 0,
			duration: 200,
			useNativeDriver: true,
		}).start();
		timeoutRef.current = setTimeout(() => {
			Animated.timing(animatedYOffset, {
				toValue: -1000,
				duration: 500,
				useNativeDriver: true,
			}).start();
			useAppInfoStore.getState().clearMessage();
		}, 4000);
	};

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);
	return (
		<Animated.View
			style={{
				...styles.container,
				transform: [{ translateY: animatedYOffset }],
			}}
		>
			<Text style={styles.infoTitle}>Сообщения: </Text>
			<View style={styles.list}>
				{messages.map((message, index) => (
					<Text style={styles.infoMessage} key={index}>
						• {message}
					</Text>
				))}
			</View>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: "auto",
		paddingTop: 35,
		paddingBottom: 15,
		paddingHorizontal: 25,
		backgroundColor: COLORS.colorOrange,
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		zIndex: 3,
		alignItems: "center",
		justifyContent: "center",
		rowGap: 20,
	},
	list: {
		gap: 5,
	},
	infoTitle: {
		fontSize: FONTSIZE.xl,
	},
	infoMessage: {
		color: COLORS.colorBg,
		alignSelf: "flex-start",
		fontSize: FONTSIZE.m,
	},
});
