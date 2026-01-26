import {
	DrawerContentComponentProps,
	DrawerContentScrollView,
	useDrawerStatus,
} from "@react-navigation/drawer";
import { Image, StyleSheet, ScrollView, View, Text } from "react-native";
import { COLORS, FONTSIZE } from "../../../shared/consts/styles";
import CloseButton from "../../close-button/close-button";
import CategoryItem from "../../category-item/ui/category-item";
import { useDrawerVisibility } from "../../../shared/store";
import { useEffect } from "react";
import useGetActiveRoute from "../../../shared/hooks/useGetActiveRoute";
import { useCategoryStore } from "../../../entities/category/store";
import CategoryList from "../../categoryList/ui/category-list";

export function CustomDrawer(props: DrawerContentComponentProps) {
	const isDrawerOpened = useDrawerVisibility((state) => state.isOpen);
	const setIsDrawerOpened = useDrawerVisibility((state) => state.setIsOpen);
	const drawerStatus = useDrawerStatus();
	const { activeRoute } = useGetActiveRoute();
	const categoryId = activeRoute?.params?.categoryId
		? Number(activeRoute.params.categoryId)
		: null;

	useEffect(() => {
		if (isDrawerOpened && drawerStatus === "closed") {
			props.navigation.openDrawer();
		}
		if (!isDrawerOpened && drawerStatus === "open") {
			props.navigation.closeDrawer();
		}
	}, [isDrawerOpened, drawerStatus]);
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
				<CategoryList
					activeCategoryId={categoryId}
					navigation={props.navigation}
				/>
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
	categoryEmpty: {
		fontSize: FONTSIZE.xxl,
		paddingVertical: 5,
		paddingHorizontal: 10,
		marginBlock: 15,
		width: 300,
		borderRadius: 20,
		textAlign: "center",
		color: COLORS.colorFg,
		alignSelf: "center",
	},
});
