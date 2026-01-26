import { useLocalSearchParams } from "expo-router/build/hooks";
import { ActivityIndicator, Text, View } from "react-native";
import { COLORS } from "../../../shared/consts/styles";
import { Suspense } from "react";

function CategoryPage() {
	const { categoryId } = useLocalSearchParams();
	return (
		<View
			style={{
				flex: 1,
				height: 300,
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: COLORS.colorBg,
				gap: 50,
			}}
		>
			<Text style={{ color: COLORS.colorFg }}>{categoryId}</Text>
		</View>
	);
}

export default function CategoryPageSafe() {
	return (
		<Suspense
			fallback={
				<View>
					<ActivityIndicator size={"large"} color={COLORS.colorOrange} />
				</View>
			}
		>
			<CategoryPage />
		</Suspense>
	);
}
