import { Pressable, StyleSheet } from "react-native";
import { CloseIcon } from "../../shared/icons/CloseIcon";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { useDrawerVisibility } from "../../shared/store";
import { useState } from "react";
import { COLORS } from "../../shared/consts/styles";

export default function CloseButton({}: Pick<
	DrawerContentComponentProps,
	"navigation"
>) {
	const [isClicked, setIsClicked] = useState(false);
	const onPress = () => {
		useDrawerVisibility.getState().setIsOpen(false);
	};
	const onPressIn = () => {
		setIsClicked(true);
	};
	const onPressOut = () => {
		setIsClicked(false);
	};
	return (
		<Pressable
			onPress={onPress}
			onPressIn={onPressIn}
			onPressOut={onPressOut}
			style={styles.button}
		>
			<CloseIcon color={isClicked ? COLORS.colorOrange : undefined} />
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
