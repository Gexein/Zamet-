import { PressableProps, StyleSheet } from "react-native";
import { MenuIcon } from "../../../shared/icons/MenuIcon";
import { useState } from "react";
import { COLORS } from "../../../shared/consts/styles";
import { useDrawerVisibility } from "../../../shared/store";
import { IconButton } from "../../../shared/components/IconButton/ui/IconButton";

export function MenuButton({
	toolTipText,
	...props
}: PressableProps & { toolTipText?: string }) {
	const [isClicked, setIsClicked] = useState<boolean>(false);
	const onPressIn = () => {
		setIsClicked(true);
	};
	const onPressOut = () => {
		setIsClicked(false);
	};
	const onPress = () => {
		useDrawerVisibility.getState().setIsOpen(true);
	};
	return (
		<IconButton
			onPressIn={onPressIn}
			onPressOut={onPressOut}
			onPress={onPress}
			style={styles.button}
			toolTipText={toolTipText}
			icon={
				<MenuIcon
					color={isClicked ? COLORS.colorOrange : undefined}
					size={35}
				/>
			}
			{...props}
			toolTipXPosition="left"
		/>
	);
}

const styles = StyleSheet.create({
	button: {
		paddingBottom: 30,
	},
});
