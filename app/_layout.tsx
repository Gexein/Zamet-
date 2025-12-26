import { SplashScreen, Stack } from "expo-router";
import { View } from "react-native";
import { COLORS } from "../shared/consts/styles";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect } from "react";
import { useSafeUserStore } from "../entities/user/hooks/useSafeUserStore";
import { AppInfo } from "../features/app-info/ui/app-info";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const initialize = useSafeUserStore((state) => state.initialize);
	const isInitialized = useSafeUserStore((state) => state.isInitialized);
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
		initialize();
	}, []);

	useEffect(() => {
		if (fontsLoaded && isInitialized) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded, isInitialized]);

	useEffect(() => {
		if (fontError) {
			throw fontError;
		}
	}, [fontError]);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<SafeAreaProvider>
			<View style={{ flex: 1, backgroundColor: COLORS.colorBg }}>
				<StatusBar style="light" />
				<AppInfo />
				<Stack
					screenOptions={{
						headerShown: false,
						contentStyle: {
							backgroundColor: COLORS.colorBg,
							paddingTop: 50,
						},
						animation: "none",
					}}
				/>
			</View>
		</SafeAreaProvider>
	);
}
