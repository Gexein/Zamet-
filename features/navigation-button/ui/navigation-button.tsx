import { Link } from "expo-router";
import { Pressable, Text } from "react-native";
import {COLORS, FONTSIZE} from '../../../shared/consts/styles';

type TProps = {
	to: string;
	textContent: string;
};

export function NavigationButton({ to, textContent }: TProps) {
	return (
		<Pressable>
			<Link href={`${to}`}>
				<Text style={styles}>{textContent}</Text>
			</Link>
		</Pressable>
	);
}

export const styles = {
	color: COLORS.colorFg,
	fontSize: FONTSIZE.xl,	
};