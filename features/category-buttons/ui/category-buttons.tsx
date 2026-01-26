import { View, Text, useWindowDimensions } from "react-native";
import { MenuIcon } from "../../../shared/icons/MenuIcon";
import { CloseIcon } from "../../../shared/icons/CloseIcon";
import { MenuButton } from "../../menu-button/ui/menu-button";
import { AddIcon } from "../../../shared/icons/AddIcon";
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
			<MenuButton />
			<AddButton />
		</View>
	);
}
