import {
	DrawerContentComponentProps,
	DrawerContentScrollView,
} from "@react-navigation/drawer";
import { Image, StyleSheet, Text, ScrollView, View } from "react-native";
import { COLORS, FONTSIZE } from "../../../shared/consts/styles";
import CloseButton from "../../close-button/close-button";
import CategoryItem from "../../category-item/ui/category-item";

export function CustomDrawer(props: DrawerContentComponentProps) {
	return (
		<DrawerContentScrollView
			{...props}
			contentContainerStyle={styles.scrollView}
		>
			<View style={styles.logoWrapper}>
				<Image
					source={require("../../../assets/save_our_links.png")}
					resizeMode={"center"}
					style={styles.logo}
				/>
			</View>
			<CloseButton navigation={props.navigation} />
			<ScrollView style={styles.content} showsVerticalScrollIndicator={true}>
				<CategoryItem navigation={props.navigation} name="Дядя Вася" />
			</ScrollView>
		</DrawerContentScrollView>
	);
}

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		backgroundColor: COLORS.colorBg,
		alignItems: "center",
	},
	logo: {
		height: 70,
	},
	logoWrapper: {
		position: "absolute",
		bottom: 30,
	},
	textStyle: {
		color: COLORS.colorFg,
	},
	content: { maxHeight: 560 },
});
