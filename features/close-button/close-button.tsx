import { Pressable, StyleSheet } from "react-native";
import { CloseIcon } from "../../shared/icons/CloseIcon";
import { DrawerContentComponentProps } from "@react-navigation/drawer";

export default function CloseButton({
	navigation,
}: Pick<DrawerContentComponentProps, "navigation">) {
	return (
		<Pressable onPress={() => navigation.closeDrawer()} style={styles.button}>
			<CloseIcon />
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		position: "absolute",
		top: 20,
		right: 20,
	},
});
