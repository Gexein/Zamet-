import { Redirect, Stack, Tabs } from "expo-router";
import { COLORS } from "../../shared/consts/styles";
import { useSafeUserStore } from "../../entities/user/hooks/useSafeUserStore";

export default function AppLayout() {
	const user = useSafeUserStore((state) => state.user);

	if (!user) {
		return <Redirect href={"/login"} />;
	}
	return (
		<Tabs
			screenOptions={{
				headerShown: false, // Скрыть заголовок
				animation: "none",
				tabBarActiveTintColor: COLORS.colorFg, // Цвет активной вкладки
				tabBarInactiveTintColor: COLORS.colorBg, // Цвет неактивной вкладки
				tabBarStyle: {
					backgroundColor: COLORS.colorOrange, // Фон таб-бара
					borderTopWidth: 1,
					borderTopColor: COLORS.colorBg,
				},
			}}
		>
			<Tabs.Screen name="index" options={{ title: "Главная" }} />
			<Tabs.Screen name="categories" options={{ title: "Заметки" }} />
			<Tabs.Screen name="sets/index" options={{ title: "Настройки" }} />
		</Tabs>
	);
}
