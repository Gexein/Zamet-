import { Redirect, Stack } from "expo-router";
import { COLORS } from "../../shared/consts/styles";
import { useSafeUserStore } from "../../entities/user/hooks/useSafeUserStore";

export default function AppLayout() {
	const user = useSafeUserStore((state) => state.user);

	if (!user) {
		return <Redirect href={"/login"} />;
	}
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				contentStyle: {
					backgroundColor: COLORS.colorBg,
					paddingTop: 50,
				},
				animation: "none",
			}}
		>
			<Stack.Screen name="index" />
		</Stack>
	);
}
