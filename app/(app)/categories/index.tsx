import { View, Text } from "react-native";
import { COLORS } from "../../../shared/consts/styles";

export default function CategoriesPage() {
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
			<Text style={{ color: COLORS.colorFg }}>Главная страница категорий</Text>
		</View>
	);
}
