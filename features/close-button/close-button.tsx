import { Pressable, StyleSheet } from "react-native";
import { CloseIcon } from "../../shared/icons/CloseIcon";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { useDrawerVisibility } from "../../shared/store";

export default function CloseButton({}: Pick<
	DrawerContentComponentProps,
	"navigation"
>) {
	const handleOnClick = () => {
		useDrawerVisibility.getState().setIsOpen(false);
	};
	return (
		<Pressable onPress={handleOnClick} style={styles.button}>
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
