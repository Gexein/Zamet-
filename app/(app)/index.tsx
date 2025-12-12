import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";
import { COLORS } from "../../shared/consts/styles";

export default function Home() {
	return (
		<View
			style={{
				flex: 1,
				height: 300,
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: COLORS.colorBg,
				gap: 50,
			}}
		>
			<Text style={{ fontFamily: "Montserrat", color: COLORS.colorFg }}>
				Главный стартовый экран. Здесь будут настройки, ссылки на список
				категорий, о приложении и тд.
			</Text>
			<Link href="/logins">
				<Text style={{ fontFamily: "Montserrat", color: COLORS.colorFg }}>
					На несуществующую страницу
				</Text>
			</Link>
			<Link href="/login">
				<Text style={{ fontFamily: "Montserrat", color: COLORS.colorFg }}>
					К логину
				</Text>
			</Link>
			<Link href="/categories">
				<Text style={{ fontFamily: "Montserrat", color: COLORS.colorFg }}>
					На главную странциу категорий
				</Text>
			</Link>
			<Link href="/categories/pizda">
				<Text style={{ fontFamily: "Montserrat", color: COLORS.colorFg }}>
					На страницу категории Пизда
				</Text>
			</Link>
		</View>
	);
}
