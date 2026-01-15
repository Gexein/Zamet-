import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Pressable, StyleSheet, Text } from "react-native";
import { ICategory } from "../../../entities/category/types";
import { COLORS, FONTSIZE } from "../../../shared/consts/styles";
import { ReactNode } from "react";

type TCategoryName = Pick<DrawerContentComponentProps, "navigation"> &
	Pick<ICategory, "name">;

export default function CategoryItem({
	navigation,
	name,
}: TCategoryName): ReactNode {
	return (
		<Pressable onPress={() => navigation.closeDrawer()} style={styles.category}>
			<Text>{name}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	category: {
		color: COLORS.colorFg,
		fontSize: FONTSIZE.xxl,
		padding: 5,
		marginBlock: 15,
		width: 300,
	},
});
