import { ReactNode } from "react";
import { Pressable, PressableProps } from "react-native";
import { ToolTip } from '../../ToolTip/ui/ToolTip'

type TProps = PressableProps & {
	toolTipText?: string;
	icon: ReactNode;
	toolTipXPosition?: "left" | "right";
	toolTipYPosition?: "top" | "bottom";
};

export function IconButton({
	toolTipText,
	icon,
	toolTipXPosition,
	toolTipYPosition,
	...rest
}: TProps) {
	return (
		<Pressable {...rest}>
			{toolTipText && (
				<ToolTip
					toolTipText={toolTipText}
					toolTipXPosition={toolTipXPosition}
					toolTipYPosition={toolTipYPosition}
				/>
			)}
			{icon}
		</Pressable>
	);
}
