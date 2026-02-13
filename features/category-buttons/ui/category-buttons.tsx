import { View } from "react-native";
import { MenuButton } from "../../menu-button/ui/menu-button";
import { AddButton } from "../../add-button/ui/add-button";
import { getScreenWidth } from "../../../shared/utils/getScreenWidth";

export default function CategoryButtons() {
	const width = getScreenWidth(1)
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
