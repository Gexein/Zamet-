import { View, Text } from "react-native";
import {
	DRAWER_PAGE_WRAPPER,
	PAGE_HEADING_STYLES,
} from "../../../shared/consts/styles";
import CategoryButtons from "../../../features/category-buttons/ui/category-buttons";

export default function CategoriesPage() {
	return (
		<View style={DRAWER_PAGE_WRAPPER.wrapper}>
			<CategoryButtons />
			<Text style={PAGE_HEADING_STYLES.title}>Главная страница категорий</Text>
		</View>
	);
}
