import { useLocalSearchParams } from "expo-router/build/hooks";
import { Text, View } from "react-native";
import { COLORS } from "../../shared/consts/styles";

export default function CategoryPage() {
	const { categoryName } = useLocalSearchParams();
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
			<Text style={{ color: COLORS.colorFg }}>{categoryName}</Text>
		</View>
	);
}
