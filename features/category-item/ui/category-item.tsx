import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Pressable, StyleSheet, Text } from "react-native";
import { ICategory } from "../../../entities/category/types";
import { COLORS, FONTSIZE } from "../../../shared/consts/styles";
import { ReactNode } from "react";
import { router } from "expo-router";
import { useDrawerVisibility } from "../../../shared/store";

type TCategoryName = Pick<DrawerContentComponentProps, "navigation"> &
	Pick<ICategory, "name" | "id"> & { active: boolean };

export default function CategoryItem({
	navigation,
	name,
	id,
	active,
}: TCategoryName): ReactNode {
	const setIsDrawerOpened = useDrawerVisibility((state) => state.setIsOpen);
	const handleOnClick = () => {
		setIsDrawerOpened(false);
		router.push(`/categories/${id}`);
	};
	return (
		<Pressable onPress={handleOnClick}>
			<Text
				style={{
					...styles.category,
					color: active ? COLORS.colorBg : COLORS.colorFg,
					backgroundColor: active ? COLORS.colorOrange : COLORS.colorBg,
				}}
			>
				{name}
			</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	category: {
		fontSize: FONTSIZE.xxl,
		paddingVertical: 5,
		paddingHorizontal: 10,
		marginBlock: 15,
		width: 300,
		borderRadius: 20,
		textAlign: "center",
	},
});
