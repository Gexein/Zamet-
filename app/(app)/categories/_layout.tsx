import { Redirect, useNavigation } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useUserStore } from "../../../entities/user/store";
import { COLORS, FONTSIZE } from "../../../shared/consts/styles";
import { MenuButton } from "../../../features/menu-button/ui/menu-button";
import { CustomDrawer } from "../../../features/drawer/ui/drawer";
import { useCategoryStore } from "../../../entities/category/store";
import CategoryButtons from "../../../features/category-buttons/ui/category-buttons";
import CategoriesPage from ".";

export default function Layout() {
	const user = useUserStore((state) => state.user);

	if (!user) {
		return <Redirect href={"/login"} />;
	}
	return (
		<Drawer
			drawerContent={(props) => <CustomDrawer {...props} />}
			screenOptions={({ navigation }) => ({
				headerTransparent: true,
				headerTitleContainerStyle: { height: 30 },
				headerStyle: {
					backgroundColor: COLORS.colorBg,
					height: 80,
				},
				sceneContainerStyle: {
					backgroundColor: COLORS.colorBg,
					shadowColor: COLORS.colorBg,
				},
				drawerStyle: {
					backgroundColor: COLORS.colorBg,
					borderRadius: 0,
				},
				headerTitleStyle: {
					color: COLORS.colorFg,
					fontFamily: "Montserrat-Medium",
					textTransform: "uppercase",
					fontSize: FONTSIZE.xl,
				},
				headerBackgroundContainerStyle: {
					backgroundColor: COLORS.colorBg,
				},
				headerTitleAlign: "center",
				headerLeft: () => {
					return <MenuButton navigation={navigation} />;
				},
			})}
			screenLayout={(props) => <CategoriesPage />}
		>
			<Drawer.Screen
				name="index"
				options={{
					title: "Категории",
				}}
			/>
			<Drawer.Screen
				name="[categoryId]"
				options={({ route }) => {
					const params = route.params as { categoryId?: string } | undefined;
					const categoryId = params?.categoryId
						? Number(params.categoryId)
						: null;
					const category = categoryId
						? useCategoryStore
								.getState()
								.categories.find((cat) => cat.id === categoryId)
						: null;

					return {
						title: category?.name || "Категория",
					};
				}}
			/>
		</Drawer>
	);
}
