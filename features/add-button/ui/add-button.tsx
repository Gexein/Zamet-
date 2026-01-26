import { Pressable, PressableProps, StyleSheet } from "react-native";
import { useState } from "react";
import { COLORS } from "../../../shared/consts/styles";
import { Navigate } from "../../navigate/ui/navigate";
import { NAV } from "../../../shared/consts/navigation";
import { AddIcon } from "../../../shared/icons/AddIcon";
import { useRouter } from "expo-router";

export function AddButton({ ...props }: PressableProps) {
	const [isClicked, setIsClicked] = useState<boolean>(false);
	const navigate = useRouter();
	const onPressIn = () => {
		setIsClicked(true);
	};
	const onPressOut = () => {
		setIsClicked(false);
	};

	const onPress = () => {
		navigate.push(NAV.ADD_CATEGORY);
	};

	return (
		<Pressable
			{...props}
			onPressIn={onPressIn}
			onPressOut={onPressOut}
			style={styles.button}
			onPress={onPress}
		>
			<AddIcon color={isClicked ? COLORS.colorOrange : undefined} size={35} />
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		paddingLeft: 15,
		paddingBottom: 23,
	},
});
