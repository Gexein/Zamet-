import { Text, View } from "react-native";
import { COLORS, FONTSIZE } from "../shared/consts/styles";
import { NavigationButton } from "../features/navigation-button/ui/navigation-button";
import { NAV } from "../shared/consts/navigation";

export default function Unmatched() {
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text
				style={{
					color: COLORS.colorFg,
					fontFamily: "Montserrat-Bold",
					fontSize: FONTSIZE.xxl,
				}}
			>
				Не нашли такого раздела 😢{" "}
			</Text>
			<NavigationButton textContent="На главную" to={NAV.HOME} />
		</View>
	);
}
