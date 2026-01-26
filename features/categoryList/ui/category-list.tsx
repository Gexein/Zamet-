import { useCategoryStore } from "../../../entities/category/store";
import { Text } from "react-native";
import { PAGE_HEADING_STYLES } from "../../../shared/consts/styles";
import CategoryItem from "../../category-item/ui/category-item";
import { DrawerContentComponentProps } from "@react-navigation/drawer";

type TProps = {
	activeCategoryId: number | null;
	navigation: DrawerContentComponentProps["navigation"];
};

export default function CategoryList({ activeCategoryId, navigation }: TProps) {
	const categories = useCategoryStore.getState().categories;
	if (!categories || categories.length < 1) {
		return <Text style={PAGE_HEADING_STYLES.title}>Список категорий пуст</Text>;
	}
	return (
		<>
			{categories.map((category) => {
				<CategoryItem
					navigation={navigation}
					name={category.name}
					id={category.id}
					active={activeCategoryId === category.id}
					key={`${category.id}${category.created_at}`}
				/>;
			})}
		</>
	);
}
