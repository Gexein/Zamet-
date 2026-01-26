import { Link } from "expo-router";
import { Pressable, Text } from "react-native";
import { NAVIGATION_BUTTON_STYLES } from "../../../shared/consts/styles";

type TProps = {
	to: string;
	textContent: string;
};

export function NavigationButton({ to, textContent }: TProps) {
	return (
		<Pressable>
			<Link href={`${to}`}>
				<Text style={NAVIGATION_BUTTON_STYLES}>{textContent}</Text>
			</Link>
		</Pressable>
	);
}
