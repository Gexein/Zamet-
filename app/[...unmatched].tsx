import { Text, View } from "react-native";
import { COLORS, FONTSIZE } from "../shared/consts/styles";
import { Link } from "expo-router";

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
			<Link href={"/"}>
				<Text
					style={{
						color: COLORS.colorFg,
						fontFamily: "Montserrat-Bold",
						fontSize: FONTSIZE.xxl,
					}}
				>
					На главную
				</Text>
			</Link>
		</View>
	);
}
