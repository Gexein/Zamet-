import { PressableProps, StyleSheet } from "react-native";
import { useState } from "react";
import { COLORS } from "../../../shared/consts/styles";
import { NAV } from "../../../shared/consts/navigation";
import { AddIcon } from "../../../shared/icons/AddIcon";
import { useRouter } from "expo-router";
import { IconButton } from "../../../shared/components/IconButton/ui/IconButton";

export function AddButton({
	toolTipText,
	...props
}: PressableProps & { toolTipText?: string }) {
	const [isClicked, setIsClicked] = useState<boolean>(false);
	const navigate = useRouter();
	const onPressIn = () => {
		setIsClicked(true);
	};
	const onPressOut = () => {
		setIsClicked(false);
	};

	const onPress = () => {
		navigate.replace(NAV.ADD_CATEGORY);
	};

	return (
		<IconButton
			onPressIn={onPressIn}
			onPressOut={onPressOut}
			onPress={onPress}
			style={styles.button}
			toolTipText={toolTipText}
			icon={
				<AddIcon color={isClicked ? COLORS.colorOrange : undefined} size={35} />
			}
			{...props}
			toolTipXPosition="left"
		/>
	);
}

const styles = StyleSheet.create({
	button: {
		paddingBottom: 23,
	},
});
