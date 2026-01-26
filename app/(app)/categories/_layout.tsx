import { Redirect } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useUserStore } from "../../../entities/user/store";
import { COLORS, FONTSIZE } from "../../../shared/consts/styles";
import { CustomDrawer } from "../../../features/drawer/ui/drawer";
import { useCategoryStore } from "../../../entities/category/store";

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
					fontSize: FONTSIZE.xl,
				},
				headerBackgroundContainerStyle: {
					backgroundColor: COLORS.colorBg,
				},
				headerTitleAlign: "center",
				headerLeft: () => null,
			})}
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
			<Drawer.Screen
				name="add"
				options={{
					title: "Создание категорий",
				}}
			/>
		</Drawer>
	);
}
