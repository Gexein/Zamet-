import { StyleSheet } from "react-native";

export const COLORS = {
	colorBg: "#120e0ef7",
	colorFg: "#FFF",
	colorOrange: "#f15d22ef",
	colorDarkLight: "#9e9696ff",
} as const;

export const FONTSIZE = {
	s: 12,
	m: 14,
	l: 16,
	xl: 18,
	xxl: 20,
} as const;

export const FONTWEIGHT = {
	thin: 200,
	normal: 400,
} as const;

export const PAGE_HEADING_STYLES = StyleSheet.create({
	title: { fontSize: FONTSIZE.xl, color: COLORS.colorFg },
});

export const DRAWER_PAGE_WRAPPER = StyleSheet.create({
	wrapper: {
		flex: 1,
		height: 300,
		alignItems: "center",
		backgroundColor: COLORS.colorBg,
		gap: 50,
		paddingTop: 110,
	},
});

export const PAGE_DESCRIPTION_STYLES = StyleSheet.create({
	description: { fontSize: FONTSIZE.l },
});
