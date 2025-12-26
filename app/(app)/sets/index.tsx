import { View, Text } from "react-native";
import { COLORS } from "../../../shared/consts/styles";

export default function SettingsPage() {
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
			<Text style={{ color: COLORS.colorFg }}>настройки</Text>
		</View>
	);
}
