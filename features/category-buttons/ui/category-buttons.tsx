import { View, useWindowDimensions } from "react-native";
import { MenuButton } from "../../menu-button/ui/menu-button";
import { AddButton } from "../../add-button/ui/add-button";

export default function CategoryButtons() {
	const { width } = useWindowDimensions();
	return (
		<View
			style={{
				justifyContent: "space-between",
				flexDirection: "row",
				width: width,
				alignItems: "center",
				paddingInline: 15,
			}}
		>
			<MenuButton toolTipText="Категории" />
			<AddButton toolTipText="Создать" />
		</View>
	);
}
