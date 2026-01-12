import Svg, { Path, G } from "react-native-svg";
import { COLORS } from "../consts/styles";

type TProps = {
	color?: string;
	size?: number;
};
export const CloseIcon = ({ color = COLORS.colorFg, size = 30 }: TProps) => (
	<Svg width={size} height={size} fill="none" viewBox="0 0 24 24">
		<G fill={color}>
			<Path d="M8.002 9.416a1 1 0 1 1 1.414-1.414l2.59 2.59 2.584-2.584a1 1 0 1 1 1.414 1.414l-2.584 2.584 2.584 2.584a1 1 0 0 1-1.414 1.414l-2.584-2.584-2.584 2.584a1 1 0 0 1-1.414-1.414l2.584-2.584-2.59-2.59Z" />
			<Path
				fillRule="evenodd"
				d="M23 4a3 3 0 0 0-3-3H4a3 3 0 0 0-3 3v16a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V4Zm-2 0a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4Z"
				clipRule="evenodd"
			/>
		</G>
	</Svg>
);
