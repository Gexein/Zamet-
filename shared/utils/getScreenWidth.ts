import { Dimensions } from "react-native";

export const getScreenWidth = (coefficient: number): number => {
    const SCREEN_WIDTH = Dimensions.get("window").width;

	return SCREEN_WIDTH * coefficient;
};
