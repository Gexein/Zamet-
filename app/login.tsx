import { StyleSheet, Text, View, Animated } from "react-native";
import { RegForm } from "../shared/components/RegForm";
import { COLORS, FONTSIZE, FONTWEIGHT } from "../shared/consts/styles";

export default function Login() {
	const textOpacity = new Animated.Value(0);
	const logoY = new Animated.Value(-1000);
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
	return (
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
				<Text style={{ ...styles.title }}>
					Привет пользователь. Мы рады приветствовать тебя в твоем новом
					цифровом пространстве для организации знаний, заметок и идей!
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
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "flex-start",
		flexGrow: 1,
		backgroundColor: COLORS.colorBg,
		gap: 80,
		paddingHorizontal: 30,
		paddingTop: 80,
	},
	title: {
		fontSize: FONTSIZE.m,
		color: COLORS.colorFg,
		textAlign: "center",
		paddingVertical: 30,
		fontFamily: "Montserrat-Thin",
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
