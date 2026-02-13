import { StyleSheet } from "react-native";

export const COLORS = {
	colorBg: "#120e0ef7",
	colorFg: "#FFF",
	colorOrange: "#f15d22ef",
	colorDarkLight: "#9e9696ff",
} as const;

export const FONTSIZE = {
	ms: 8,
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
	description: { fontSize: FONTSIZE.l, color: COLORS.colorFg },
});

export const TOOLTIP_STYLES = StyleSheet.create({
	toolTip: { fontSize: FONTSIZE.s, color: COLORS.colorDarkLight },
	container: { position: "absolute", width: 100 },
});

export const FORM_STYLES = StyleSheet.create({
	form: {
		rowGap: 35,
		alignItems: "center",
		justifyContent: "center",
	},
	inputsWrapper: {rowGap: 35},
	buttonText: {
		fontSize: FONTSIZE.xl,
		fontFamily: "Montserrat",
	},
});

export const INPUT_STYLES = StyleSheet.create({
	container: {
		rowGap: 10,
	},
	input: {
		backgroundColor: COLORS.colorDarkLight,
		color: COLORS.colorFg,
		borderRadius: 5,
		paddingHorizontal: 10,
		fontFamily: "Montserrat-Light",
		fontSize: FONTSIZE.l,
	},

	label: {
		color: COLORS.colorFg,
		fontSize: FONTSIZE.s,
		alignSelf: "flex-start",
		fontFamily: "Montserrat-Thin",
	},
});

export const P_STYLES = StyleSheet.create({
	p: {
		fontSize: FONTSIZE.m,
		color: COLORS.colorFg,
		textAlign: "center",
		paddingVertical: 30,
		fontFamily: "Montserrat-Thin",
	},
});