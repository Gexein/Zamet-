import { View, Text } from "react-native";
import {
	DRAWER_PAGE_WRAPPER,
	PAGE_HEADING_STYLES,
} from "../../../shared/consts/styles";
import { NavigationButton } from "../../../features/navigation-button/ui/navigation-button";
import { NAV } from "../../../shared/consts/navigation";
import { AddCategoryForm } from "../../../features/add-category-form/ui/add-category-form";

export default function CategoriesAddPage() {
	return (
		<View style={DRAWER_PAGE_WRAPPER.wrapper}>
			<NavigationButton to={NAV.CATEGORIES} textContent="Назад" />
			<Text style={PAGE_HEADING_STYLES.title}>
				Страницы добавления категорий
			</Text>
			<AddCategoryForm />
		</View>
	);
}
