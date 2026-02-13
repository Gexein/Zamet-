import { StyleSheet, Text, View, Animated, ImageBackground } from "react-native";
import { RegForm } from "../features/reg-form/ui/reg-form";
import { COLORS, FONTSIZE, FONTWEIGHT, P_STYLES } from "../shared/consts/styles";
import { Redirect } from "expo-router";
import { useEffect, useRef } from "react";
import { useSafeUserStore } from "../entities/user/hooks/useSafeUserStore";

export default function Login() {
	const textOpacity = useRef(new Animated.Value(0)).current;
	const logoY = useRef(new Animated.Value(-1000)).current;
	const user = useSafeUserStore((state) => state.user);
	useEffect(() => {
		Animated.parallel([
			Animated.timing(textOpacity, {
				toValue: 1,
				duration: 1000,
				useNativeDriver: true,
				delay: 1000,
			}),
			Animated.timing(logoY, {
				toValue: 0,
				duration: 500,
				useNativeDriver: true,
				delay: 0,
			}),
		]).start();
	}, []);

	if (user) {

		return <Redirect href="/" />;
	}
	return (
		<ImageBackground
			source={require("../assets/zameto4ka.png")}
			style={styles.bg}
			resizeMode="cover"
		>
			<View style={styles.container}>
				<Animated.Image
					source={require("../assets/save_our_links.png")}
					style={{ ...styles.logo, transform: [{ translateY: logoY }] }}
					resizeMode="center"
				/>
				<RegForm />
				<Animated.View
					style={{
						borderBottomColor: COLORS.colorFg,
						borderBottomWidth: 0.5,
						borderTopColor: COLORS.colorFg,
						borderTopWidth: 0.5,
						opacity: textOpacity,
					}}
				>
					<Text style={P_STYLES.p}>
						Привет, пользователь! Мы рады приветствовать тебя в твоем новом
						цифровом пространстве для организации знаний, заметок и идей.
						{/* "Заметочка" - это
						интеллектуальный помощник для структурирования всей вашей информации: */}
					</Text>

					{/* <View style={{ ...styles.subview }}>
						<Text style={styles.subtitle}>
							• Создавайте категории и подкатегории — выстраивайте свою систему
							хранения так, как удобно именно вам.
						</Text>
						<Text style={styles.subtitle}>
							• Сохраняйте ссылки, заметки и изображения — все в одном месте
						</Text>
						<Text style={styles.subtitle}>
							• Добавляйте комментарии и теги — чтобы быстро находить нужное
						</Text>
						<Text style={styles.subtitle}>
							• Группируйте материалы по предназначению — для работы, учебы или
							хобби.
						</Text>
					</View> */}
				</Animated.View>
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	bg: {
		flex: 1,
	},
	container: {
		alignItems: "center",
		justifyContent: "flex-start",
		flex: 1,
		backgroundColor: "rgba(18, 14, 14, 0.78)",
		gap: 80,
		paddingHorizontal: 30,
		paddingTop: 80,
	},
	subview: {
		paddingVertical: 20,
		gap: 5,
		justifyContent: "center",
		alignItems: "center",
	},
	subtitle: {
		fontSize: FONTSIZE.m,
		color: COLORS.colorFg,
		fontWeight: FONTWEIGHT.thin,
		textAlign: "left",
		fontStyle: "italic",
	},
	logo: {
		height: 70,
	},
});
