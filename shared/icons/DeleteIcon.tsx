import Svg, { Path } from "react-native-svg";
import { COLORS } from "../consts/styles";

type TProps = {
	color?: string;
	size?: number;
};

export const DeleteIcon = ({ color = COLORS.colorBg, size = 30 }: TProps) => (
	<Svg width={size} height={size} fill="none" viewBox="0 0 24 24">
		<Path
			stroke={color}
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1}
			d="m11 10 4 4m-4 0 4-4M2.772 13.518l4.666 4A2 2 0 0 0 8.74 18H18a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H8.74a2 2 0 0 0-1.302.481l-4.666 4a2 2 0 0 0 0 3.037Z"
		/>
	</Svg>
);
