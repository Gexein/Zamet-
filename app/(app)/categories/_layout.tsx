import { Redirect } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useUserStore } from "../../../entities/user/store";
import { COLORS, FONTSIZE } from "../../../shared/consts/styles";
import { MenuButton } from "../../../features/menu-button/ui/menu-button";

export default function Layout() {
	const user = useUserStore((state) => state.user);

	if (!user) {
		return <Redirect href={"/login"} />;
	}
	return (
		<Drawer
			screenOptions={({ navigation }) => ({
				headerTransparent: true,
				headerStyle: {
					backgroundColor: COLORS.colorBg,
					height: 120,
					shadowColor: COLORS.colorBg,
				},
				sceneContainerStyle: {
					backgroundColor: COLORS.colorBg,
					shadowColor: COLORS.colorBg,
				},
				drawerStyle: {
					backgroundColor: COLORS.colorBg,
					// width: 280,
				},
				headerTitleStyle: {
					color: COLORS.colorFg,
					fontFamily: "Montserrat-Medium",
					textTransform: "uppercase",
					fontSize: FONTSIZE.xl,
				},
				headerBackgroundContainerStyle: { backgroundColor: COLORS.colorBg },
				headerTitleAlign: "center",
				headerLeft: () => {
					return <MenuButton navigation={navigation} />;
				},
			})}
		>
			<Drawer.Screen
				name="index"
				options={{
					title: "<-- Категории",
				}}
			/>
			<Drawer.Screen
				name="[categoryName]"
				options={{
					title: "Категории",
				}}
			/>
		</Drawer>
	);
}
