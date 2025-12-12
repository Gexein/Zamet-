import { Slot, SplashScreen, Stack, Tabs } from "expo-router";
import { Text, View, ActivityIndicator } from "react-native";
import { COLORS } from "../shared/consts/styles";
import { StatusBar } from "expo-status-bar";
import { isLoaded, useFonts } from "expo-font";
import {
	SafeAreaProvider,
	useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const insets = useSafeAreaInsets();
	const [fontsLoaded, fontError] = useFonts({
		Montserrat: require("../assets/fonts/Montserrat-Regular.ttf"),
		"Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
		"Montserrat-Light": require("../assets/fonts/Montserrat-Light.ttf"),
		"Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
		"Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
		"Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
		"Montserrat-Thin": require("../assets/fonts/Montserrat-Thin.ttf"),
	});

	useEffect(() => {
		if (fontsLoaded) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	useEffect(() => {
		if (fontError) {
			throw fontError;
		}
	}, [fontError]);

	if (!fontsLoaded && !fontError) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: COLORS.colorBg,
				}}
			>
				<ActivityIndicator size="large" color={COLORS.colorFg} />
			</View>
		);
	}

	return (
		<SafeAreaProvider>
			<View style={{ flex: 1, backgroundColor: COLORS.colorBg }}>
				<StatusBar style="light" />
				<Stack
					screenOptions={{
						headerShown: false,
						contentStyle: {
							backgroundColor: COLORS.colorBg,
							paddingTop: insets.top,
						},
						animation: "none",
					}}
				/>
			</View>
		</SafeAreaProvider>
	);
}
