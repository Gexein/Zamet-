import { View, Text } from "react-native";
import { MenuIcon } from "../../../shared/icons/MenuIcon";
import { CloseIcon } from "../../../shared/icons/CloseIcon";

export default function CategoryButtons() {
	return (
		<View
			style={{
				justifyContent: "space-between",
				flexDirection: "row",
				width: 300,
				alignItems: "center",
			}}
		>
			<MenuIcon />
			<CloseIcon />
		</View>
	);
}
