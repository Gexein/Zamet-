import { Pressable, PressableProps, StyleSheet } from "react-native";
import { MenuIcon } from "../../../shared/icons/MenuIcon";
import { useState } from "react";
import { COLORS } from "../../../shared/consts/styles";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useDrawerVisibility } from "../../../shared/store";

export function MenuButton({
	navigation,
	...props
}: PressableProps & {
	navigation: DrawerNavigationProp<any, string, undefined>;
}) {
	const [isClicked, setIsClicked] = useState<boolean>(false);
	const onPressIn = () => {
		setIsClicked(true);
	};
	const onPressOut = () => {
		setIsClicked(false);
	};
	const onPress = () => {
		useDrawerVisibility.getState().setIsOpen(true);

		navigation.toggleDrawer();
	};
	return (
		<Pressable
			{...props}
			onPressIn={onPressIn}
			onPressOut={onPressOut}
			onPress={onPress}
			style={styles.button}
		>
			<MenuIcon color={isClicked ? COLORS.colorOrange : undefined} size={35} />
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		paddingLeft: 15,
		paddingBottom: 30,
	},
});
