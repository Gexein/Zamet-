import { View, Text, StyleSheet } from "react-native";
import { TOOLTIP_STYLES } from "../../../consts/styles";

type TProps = {
	toolTipText: string;
	toolTipXPosition?: "left" | "right";
	toolTipYPosition?: "top" | "bottom";
};

export function ToolTip({
	toolTipText,
	toolTipXPosition = "left",
	toolTipYPosition = "bottom",
}: TProps) {
	return (
		<View
			style={
				(TOOLTIP_STYLES.container,
				toolTipXPosition === "left" ? styles.left : styles.right,
				toolTipYPosition === "bottom" ? styles.bottom : styles.top)
			}
		>
			<Text style={{ ...TOOLTIP_STYLES.toolTip }}>{toolTipText}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	left: { left: 0 },
	right: { right: 0 },
	top: { bottom: 30 },
	bottom: {
		top: 60,
	},
});
